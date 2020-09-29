import path from 'path';
import process from 'process';
import { merge } from 'lodash';
import { createJobs, createReport } from '@bundle-stats/utils';
import { filter, validate } from '@bundle-stats/utils/lib-esm/webpack';
import {
  TEXT,
  getBaselineStatsFilepath,
  getReportInfo,
  readBaseline,
  createArtifacts,
} from '@bundle-stats/cli-utils';

import LOCALES from '../locales.json';

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

const PLUGIN_NAME = 'BundleStats';

const generateReports = async (compilation, options) => {
  const { compare, baseline, html, json, outDir } = options;

  const logger = compilation.getInfrastructureLogger
    ? compilation.getInfrastructureLogger(PLUGIN_NAME)
    : console;
  const source = compilation.getStats().toJson(options.stats);
  const outputPath = compilation?.options?.output?.path;

  const invalid = validate(source);

  if (invalid) {
    logger.warn(`${invalid}\n${LOCALES.WEBPACK_CONFIGURATION_URL}`);
  }

  const data = filter(source);

  // Webpack builtAt is not available yet
  if (!data.builtAt) {
    data.builtAt = Date.now();
  }

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

  const jobs = createJobs([{ webpack: data }, ...(compare ? [{ webpack: baselineStats }] : [])]);
  const report = createReport(jobs);
  const artifacts = createArtifacts(jobs, report, { html, json });

  const assets = [];

  Object.values(artifacts).forEach(({ filename, output }) => {
    const filepath = path.join(outDir, filename);

    assets.push({
      filepath,
      size: () => 0,
      source: () => output,
    });
  });

  if (baseline) {
    assets.push({
      filepath: baselineFilepath,
      size: () => 0,
      source: () => JSON.stringify(data),
    });

    logger.info(`Write baseline data to ${baselineFilepath}`);
  }

  // Add reports to assets
  assets.forEach(({ filepath, ...asset }) => {
    // eslint-disable-next-line no-param-reassign
    compilation.assets[filepath] = asset;
  });

  const info = getReportInfo(report);

  if (info) {
    logger.info(info.text);
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
          context: compiler.options?.context,
        },
      },
      this.options,
    );

    compiler.hooks.emit.tapAsync(PLUGIN_NAME, async (compilation, callback) => {
      await generateReports(compilation, options);
      callback();
    });
  }
}
