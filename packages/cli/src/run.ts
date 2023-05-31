/* eslint-disable no-console */
import path from 'path';
import { createReadStream } from 'fs';
import { pipeline } from 'stream/promises';
import { outputFile } from 'fs-extra';
import { Listr } from 'listr2';
import { get } from 'lodash';
import boxen from 'boxen';
import JSONStream from 'JSONStream';
import '@bundle-stats/utils/lib/polyfills';
import {
  DELTA_TYPE_HIGH_NEGATIVE,
  DELTA_TYPE_NEGATIVE,
  DELTA_TYPE_LOW_NEGATIVE,
  DELTA_TYPE_NO_CHANGE,
  DELTA_TYPE_LOW_POSITIVE,
  DELTA_TYPE_POSITIVE,
  DELTA_TYPE_HIGH_POSITIVE,
  createJobs,
  createReport,
} from '@bundle-stats/utils';
import webpackFilter from '@bundle-stats/plugin-webpack-filter';
import webpackValidate from '@bundle-stats/plugin-webpack-validate';
import {
  TEXT,
  createArtifacts,
  getBaselineStatsFilepath,
  getReportInfo,
  readBaseline,
  writeBaseline,
} from '@bundle-stats/cli-utils';

import LOCALES from './locales.json';

const REPORT_INFO_COLORS = {
  [DELTA_TYPE_HIGH_NEGATIVE]: 'red',
  [DELTA_TYPE_NEGATIVE]: 'red',
  [DELTA_TYPE_LOW_NEGATIVE]: 'yellow',
  [DELTA_TYPE_NO_CHANGE]: 'gray',
  [DELTA_TYPE_LOW_POSITIVE]: 'green',
  [DELTA_TYPE_POSITIVE]: 'green',
  [DELTA_TYPE_HIGH_POSITIVE]: 'green',
};

const getReportInfoBorderColor = (reportInfo: any) => {
  const { deltaType } = reportInfo.info;
  return REPORT_INFO_COLORS[deltaType];
};

interface RunOptions {
  baseline: boolean;
  compare: boolean;
  html: boolean;
  json: boolean;
  outDir: string;
  artifactFilepaths: Array<string>;
}

export default async function run(options: RunOptions): Promise<void> {
  const { baseline, compare, html, json, outDir, artifactFilepaths } = options;

  const tasks = new Listr([
    {
      title: 'Read Webpack stats files',
      task: async (ctx) => {
        const sources = await Promise.all(
          artifactFilepaths.map((filepath) => {
            const stream = JSONStream.parse();
            pipeline(createReadStream(filepath), stream);
            return new Promise((fulfill) => {
              stream.on('data', fulfill);
            });
          }),
        );

        sources.forEach((source, index) => {
          const invalid = webpackValidate(source);

          if (invalid) {
            throw new Error(
              `${invalid}\n${LOCALES.WEBPACK_CONFIGURATION_URL}\nFilepath: ${artifactFilepaths[index]}`,
            );
          }
        });

        ctx.sources = sources.map((source) => ({ webpack: webpackFilter(source) }));
      },
    },
    {
      title: 'Read baseline data',
      task: async (ctx, task) => {
        const baselineFilepath = path.relative(process.cwd(), getBaselineStatsFilepath());
        // eslint-disable-next-line no-param-reassign
        task.title = `${task.title} (${baselineFilepath})`;

        ctx.sources = ctx.sources.concat([{ webpack: webpackFilter(ctx.baselineStats) }]);
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
        const filteredWebpackStats = webpackFilter(stats) as JSON;
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
          Object.values(ctx.artifacts).map(({ filename, output }: any) => ({
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

  let result = {} as { output: any; report: any };

  try {
    result = await tasks.run();
  } catch (err: any) {
    console.error(err.message);
  }

  const { output, report } = result;

  const reportInfo = getReportInfo(report);

  if (reportInfo) {
    const infoBox = boxen(reportInfo.text, {
      padding: 1,
      borderColor: getReportInfoBorderColor(reportInfo),
    });

    console.log(`\n${infoBox}`);
  }

  console.log('\nArtifacts:');
  output?.map((reportPath: any) => console.log(`- ${reportPath}`));
}
