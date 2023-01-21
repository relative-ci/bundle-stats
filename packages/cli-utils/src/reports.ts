import path from 'path';
import merge from 'lodash/merge';
import { createJobs, createReport } from '@bundle-stats/utils';
import filter from '@bundle-stats/plugin-webpack-filter';
import validate from '@bundle-stats/plugin-webpack-validate';

import * as TEXT from './text';
import { createArtifacts } from './create-artifacts';
import { getBaselineStatsFilepath, readBaseline } from './baseline';

export function getReportInfo(report: any): any {
  return report?.insights?.webpack?.assetsSizeTotal?.data;
}

export interface ReportOptions {
  /**
   * Use local saved stats for comparison
   * Default: `true`.
   */
  compare?: boolean;

  /**
   * Save current webpack stats as baseline
   * Default: `false`.
   */
  baseline?: boolean;

  /**
   * Output html report
   * Default: `true`.
   */
  html?: boolean;

  /**
   * Output json report
   * Default: `false`.
   */
  json?: boolean;

  /**
   * Output directory relative to webpack `output.path`
   * Default: `''`.
   */
  outDir?: String;

  /**
   * Skip logging
   * Default: `false`
   */
  silent?: boolean
}

interface ReportPluginOptions {
  outputPath?: string;
  logger?: Console;
  invalidOptionsUrl?: string;
}

type ReportAssets = Record<string, string>;

const DEFAULT_OPTIONS = {
  compare: true,
  baseline: Boolean(process.env.BUNDLE_STATS_BASELINE),
  html: true,
  json: false,
  outDir: '',
  silent: false,
};

export const generateReports = async (
  source: object,
  options: ReportOptions,
  pluginOptions: ReportPluginOptions = {},
): Promise<ReportAssets> => {
  const { compare, baseline, html, json, outDir } = merge({}, DEFAULT_OPTIONS, options);
  const { invalidOptionsUrl: invalidParamsUrl, outputPath, logger = console } = pluginOptions;
  const newAssets: ReportAssets = {};

  const invalid = validate(source);

  if (invalid) {
    logger.warn([invalid, invalidParamsUrl].join('\n'));
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
      const baselineStatsData = await readBaseline();
      baselineStats = filter(baselineStatsData);
      if (!options.silent) logger.info(`Read baseline from ${baselineFilepath}`);
    }
  } catch (err) {
    logger.warn(TEXT.PLUGIN_BASELINE_MISSING_WARN);
  }

  const jobs = createJobs([
    { webpack: data },
    ...(compare && baselineStats ? [{ webpack: baselineStats }] : []),
  ]);
  const report = createReport(jobs);
  const artifacts = createArtifacts(jobs, report, { html, json });

  Object.values(artifacts).forEach(({ filename, output }) => {
    const filepath = path.join(outDir, filename);

    // eslint-disable-next-line no-param-reassign
    newAssets[filepath] = output;
  });

  if (baseline) {
    // eslint-disable-next-line no-param-reassign
    newAssets[baselineFilepath] = JSON.stringify(data);

    if (!options.silent) logger.info(`Write baseline data to ${baselineFilepath}`);
  }

  const info = getReportInfo(report);

  if (info && !options.silent) {
    logger.info(info.text);
  }

  return newAssets;
};
