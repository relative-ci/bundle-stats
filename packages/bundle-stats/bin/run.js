/* eslint-disable no-console */
const path = require('path');
const { readJSON, outputFile } = require('fs-extra');
const Listr = require('listr');
const { get } = require('lodash');
const { createJobs, extractDataFromWebpackStats } = require('@bundle-stats/utils');

// eslint-disable-next-line import/no-unresolved
const {
  TEXT,
  createReports,
  getBaselineStatsFilepath,
  readBaseline,
  writeBaseline,
} = require('../');

module.exports = ({
  baseline, compare, html, json, outDir, artifactFilepaths,
}) => {
  const tasks = new Listr([
    {
      title: 'Read Webpack stats files',
      task: (ctx) => Promise.all(
        artifactFilepaths.map((filepath) => readJSON(filepath)),
      ).then((artifacts) => {
        ctx.artifacts = artifacts.map((stats) => ({
          webpack: {
            stats: extractDataFromWebpackStats(stats),
          },
        }));
      }),
    },
    {
      title: 'Read baseline data',
      task: async (ctx, task) => {
        const baselineFilepath = path.relative(process.cwd(), getBaselineStatsFilepath());
        // eslint-disable-next-line no-param-reassign
        task.title = `${task.title} (${baselineFilepath})`;

        ctx.artifacts = ctx.artifacts.concat([{
          webpack: {
            stats: extractDataFromWebpackStats(ctx.baselineStats),
          },
        }]);
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
        const stats = get(ctx, 'artifacts.0.webpack.stats');
        const extractedWebpackStats = extractDataFromWebpackStats(stats);
        const baselineFilepath = path.relative(process.cwd(), getBaselineStatsFilepath());

        return writeBaseline(extractedWebpackStats).then(() => {
          // eslint-disable-next-line no-param-reassign
          task.title = `${task.title} (${baselineFilepath})`;
        });
      },
      skip: () => !baseline && TEXT.CLI_NO_BASELINE,
    },
    {
      title: 'Process data',
      task: (ctx) => {
        ctx.initialData = createJobs(ctx.artifacts);
      },
    },
    {
      title: 'Generate reports',
      task: async (ctx) => {
        ctx.reports = await createReports(ctx.initialData, { html, json });
      },
    },
    {
      title: 'Save reports',
      task: (ctx) => new Listr(
        ctx.reports.map(({ filename, output }) => ({
          title: filename,
          task: async () => {
            const filepath = path.join(outDir, filename);
            await outputFile(filepath, output);
            ctx.output = [
              ...ctx.output ? ctx.output : [],
              filepath,
            ];
          },
        })),
        { concurrent: true },
      ),
    },
  ]);

  tasks.run()
    .then(({ output }) => {
      console.log('\nReports saved:');
      output.map((reportPath) => console.log(`- ${reportPath}`));
    })
    .catch((err) => {
      console.error(err);
    });
};
