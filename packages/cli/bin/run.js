/* eslint-disable no-console */
const path = require('path');
const { readJSON, outputFile } = require('fs-extra');
const Listr = require('listr');
const { get } = require('lodash');
const boxen = require('boxen');

require('@bundle-stats/utils/lib/polyfills');

const {
  DELTA_TYPE_HIGH_NEGATIVE,
  DELTA_TYPE_NEGATIVE,
  DELTA_TYPE_LOW_NEGATIVE,
  DELTA_TYPE_NO_CHANGE,
  DELTA_TYPE_LOW_POSITIVE,
  DELTA_TYPE_POSITIVE,
  DELTA_TYPE_HIGH_POSITIVE,
  createJobs,
  createReport,
} = require('@bundle-stats/utils');
const { filter, validate } = require('@bundle-stats/utils/lib/webpack');
const {
  TEXT,
  createArtifacts,
  getBaselineStatsFilepath,
  getReportInfo,
  readBaseline,
  writeBaseline,
} = require('@bundle-stats/cli-utils');
const LOCALES = require('../locales.json');

const REPORT_INFO_COLORS = {
  [DELTA_TYPE_HIGH_NEGATIVE]: 'red',
  [DELTA_TYPE_NEGATIVE]: 'red',
  [DELTA_TYPE_LOW_NEGATIVE]: 'yellow',
  [DELTA_TYPE_NO_CHANGE]: 'gray',
  [DELTA_TYPE_LOW_POSITIVE]: 'green',
  [DELTA_TYPE_POSITIVE]: 'green',
  [DELTA_TYPE_HIGH_POSITIVE]: 'green',
};

const getReportInfoBorderColor = (reportInfo) => {
  const { deltaType } = reportInfo.info;
  return REPORT_INFO_COLORS[deltaType];
};

module.exports = ({ baseline, compare, html, json, outDir, artifactFilepaths }) => {
  const tasks = new Listr([
    {
      title: 'Read Webpack stats files',
      task: async (ctx) => {
        const sources = await Promise.all(artifactFilepaths.map((filepath) => readJSON(filepath)));

        sources.forEach((source, index) => {
          const invalid = validate(source);

          if (invalid) {
            throw new Error(
              `${invalid}\n${LOCALES.WEBPACK_CONFIGURATION_URL}\nFilepath: ${artifactFilepaths[index]}`,
            );
          }
        });

        ctx.sources = sources.map((source) => ({ webpack: filter(source) }));
      },
    },
    {
      title: 'Read baseline data',
      task: async (ctx, task) => {
        const baselineFilepath = path.relative(process.cwd(), getBaselineStatsFilepath());
        // eslint-disable-next-line no-param-reassign
        task.title = `${task.title} (${baselineFilepath})`;

        ctx.sources = ctx.sources.concat([{ webpack: filter(ctx.baselineStats) }]);
      },
      skip: async (ctx) => {
        if (!compare) {
          return TEXT.CLI_NO_COMPARE_MODE;
        }

        if (artifactFilepaths.length !== 1) {
          return TEXT.CLI_MULTIPLE_STATS;
        }

        let baselineStats = {};

        try {
          baselineStats = await readBaseline();
          ctx.baselineStats = baselineStats;
        } catch (err) {
          return TEXT.CLI_BASELINE_MISSING_WARN;
        }

        return false;
      },
    },
    {
      title: 'Write baseline data',
      task: (ctx, task) => {
        const stats = get(ctx, 'sources[0]webpack');
        const filteredWebpackStats = filter(stats);
        const baselineFilepath = path.relative(process.cwd(), getBaselineStatsFilepath());

        return writeBaseline(filteredWebpackStats).then(() => {
          // eslint-disable-next-line no-param-reassign
          task.title = `${task.title} (${baselineFilepath})`;
        });
      },
      skip: () => !baseline && TEXT.CLI_NO_BASELINE,
    },
    {
      title: 'Process data',
      task: (ctx) => {
        ctx.jobs = createJobs(ctx.sources);
        ctx.report = createReport(ctx.jobs);
      },
    },
    {
      title: 'Generate reports',
      task: async (ctx) => {
        ctx.artifacts = await createArtifacts(ctx.jobs, ctx.report, { html, json });
      },
    },
    {
      title: 'Save reports',
      task: (ctx) =>
        new Listr(
          Object.values(ctx.artifacts).map(({ filename, output }) => ({
            title: filename,
            task: async () => {
              const filepath = path.join(outDir, filename);
              await outputFile(filepath, output);

              ctx.output = [...(ctx.output ? ctx.output : []), filepath];
            },
          })),
          { concurrent: true },
        ),
    },
  ]);

  tasks
    .run()
    .then(({ output, report }) => {
      const reportInfo = getReportInfo(report);

      if (reportInfo) {
        const infoBox = boxen(reportInfo.text, {
          padding: 1,
          borderColor: getReportInfoBorderColor(reportInfo),
        });

        console.log(`\n${infoBox}`);
      }

      console.log('\nArtifacts:');
      output.map((reportPath) => console.log(`- ${reportPath}`));
    })
    .catch((err) => {
      console.error(err.message);
    });
};
