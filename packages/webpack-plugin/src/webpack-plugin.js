import path from 'path';
import process from 'process';
import { get, merge } from 'lodash';
import { createJobs, createReport } from '@bundle-stats/utils';
import { filter } from '@bundle-stats/utils/lib-esm/webpack';
import {
  TEXT, getBaselineStatsFilepath, getReportInfo, readBaseline, createArtifacts,
} from '@bundle-stats/cli-utils';

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
    hash: true,
    builtAt: true,
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

  const data = filter(
    compilation.getStats().toJson(statsOptions),
  );

  // Webpack builtAt is not available yet
  if (!data.builtAt) {
    data.builtAt = Date.now();
  }

  const outputPath = get(compilation, 'options.output.path');

  const logger = compilation.getInfrastructureLogger
    ? compilation.getInfrastructureLogger('BundleStats')
    : console;

  const baselineFilepath = getBaselineStatsFilepath(outputPath);
  let baselineStats = null;

  try {
    if (compare) {
      baselineStats = await readBaseline();
      baselineStats = filter(baselineStats);
      logger.info(`Read baseline from ${baselineFilepath}`);
    }
  } catch (err) {
    logger.warn(TEXT.PLUGIN_BASELINE_MISSING_WARN);
  }

  const jobs = createJobs([
    { webpack: data },
    ...compare ? [{ webpack: baselineStats }] : [],
  ]);
  const report = createReport(jobs);
  const artifacts = createArtifacts(jobs, report, { html, json });

  Object.values(artifacts).forEach(({ filename, output }) => {
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

    logger.info(`Write baseline data to ${baselineFilepath}`);
  }

  const info = getReportInfo(report);

  if (info) {
    logger.info(info);
  }

  callback();
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
