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
   * Save current stats as baseline
   * Default: `false`.
   */
  baseline?: boolean;

  /**
   * Custom absolute baseline file path
   *  - relative to the output dir or absolute file when the output path is present
   *  or
   *  - absolute path when the output path is missing
   * Default: node_modules/.cache/bundle-stats/baseline.json
   */
  baselineFilepath?: string;

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
  outDir?: string;

  /**
   * Skip logging
   * Default: `false`
   */
  silent?: boolean;
}

interface ReportPluginOptions {
  /**
   * Absolute path for the output directory
   */
  outputPath?: string;
  /**
   * Custom logger
   */
  logger?: Console;
  /**
   * Documentation URL for the invalid options
   */
  invalidOptionsUrl?: string;
}

type ReportAssets = Record<string, string>;

const DEFAULT_OPTIONS = {
  html: true,
  json: false,
  compare: true,
  baseline: Boolean(process.env.BUNDLE_STATS_BASELINE),
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

  // Check if the source has a valid structure
  const invalid = validate(source);

  if (invalid) {
    logger.warn([invalid, invalidParamsUrl].join('\n'));
  }

  const data = filter(source);

  // Bundler builtAt might not be available yet
  if (!data.builtAt) {
    data.builtAt = Date.now();
  }

  const baselineFilepath = getBaselineStatsFilepath(options.baselineFilepath, outputPath);
  let baselineStats = null;

  if (compare) {
    try {
      const baselineStatsData = await readBaseline(options.baselineFilepath);
      baselineStats = filter(baselineStatsData);

      if (!options.silent) {
        logger.info(`Read baseline from ${baselineFilepath}`);
      }
    } catch (err) {
      logger.warn(TEXT.PLUGIN_BASELINE_MISSING_WARN);
    }
  }

  const sources = [{ webpack: data }];

  if (baselineStats) {
    sources.push({ webpack: baselineStats });
  }

  const jobs = createJobs(sources);
  const report = createReport(jobs);
  const artifacts = createArtifacts(jobs, report, { html, json });

  Object.values(artifacts).forEach(({ filename, output }) => {
    const filepath = path.join(outDir, filename);
    // eslint-disable-next-line no-param-reassign
    newAssets[filepath] = output;
  });

  // Save baseline JSON file if option is set
  if (baseline) {
    // eslint-disable-next-line no-param-reassign
    newAssets[baselineFilepath] = JSON.stringify(data);

    if (!options.silent) {
      logger.info(`Write baseline data to ${baselineFilepath}`);
    }
  }

  const info = getReportInfo(report);

  if (info && !options.silent) {
    logger.info(info.text);
  }

  return newAssets;
};
