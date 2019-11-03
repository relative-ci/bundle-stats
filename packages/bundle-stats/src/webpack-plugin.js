import path from 'path';
import process from 'process';
import { get, merge } from 'lodash';
import { createJobs } from '@bundle-stats/utils';

import * as TEXT from './text';
import { getBaselineStatesFilepath, readBaseline } from './baseline';
import { createReports } from './create-report';

const DEFAULT_OPTIONS = {
  compare: true,
  baseline: Boolean(process.env.BUNDLE_STATS_BASELINE),
  html: true,
  json: false,
  outDir: '',
  stats: {
    context: process.cwd(),
    assets: true,
    entrypoints: true,
    chunks: true,
    modules: true,
  },
};

const getOnEmit = (options) => async (compilation, callback) => {
  const {
    compare,
    baseline,
    html,
    json,
    outDir,
    stats: statsOptions,
  } = options;

  const data = compilation.getStats().toJson(statsOptions);
  const outputPath = get(compilation, 'options.output.path');

  const logger = compilation.getInfrastructureLogger
    ? compilation.getInfrastructureLogger('BundleStats')
    : console;

  const baselineFilepath = getBaselineStatesFilepath(outputPath);
  let baselineStats = null;

  try {
    if (compare) {
      baselineStats = await readBaseline();
    }
  } catch (err) {
    logger.warn(TEXT.PLUGIN_BASELINE_MISSING_WARN);
  }

  const jobs = createJobs([
    { webpack: { stats: data } },
    ...compare ? [{ webpack: { stats: baselineStats } }] : [],
  ]);

  let reports = [];

  try {
    reports = await createReports(jobs, { html, json });

    reports.forEach(({ filename, output }) => {
      const filepath = path.join(outDir, filename);

      // eslint-disable-next-line no-param-reassign
      compilation.assets[filepath] = {
        size: () => 0,
        source: () => output,
      };
    });

    if (baseline) {
      // eslint-disable-next-line no-param-reassign
      compilation.assets[baselineFilepath] = {
        size: () => 0,
        source: () => JSON.stringify(data),
      };
    }

    callback();
  } catch (err) {
    callback(err);
  }
};

export class BundleStatsWebpackPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const options = merge(
      {},
      DEFAULT_OPTIONS,
      {
        stats: {
          context: get(compiler, 'options.context'),
        },
      },
      this.options,
    );

    compiler.hooks.emit.tapAsync('BundleStats', getOnEmit(options));
  }
}
