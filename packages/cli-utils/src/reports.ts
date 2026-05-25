import path from 'path';
import merge from 'lodash/merge';
import type { JobInsightAssetsSizeTotalData } from '@bundle-stats/utils';
import { createJobs, createReport } from '@bundle-stats/utils';
import filter from '@bundle-stats/plugin-webpack-filter';

import * as TEXT from './text';
import { createArtifacts } from './create-artifacts';
import { getBaselinePath, getBaselineRelativePath, readBaseline } from './baseline';

export function getReportInfo(report: any): JobInsightAssetsSizeTotalData {
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
   * Custom baseline file path
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
}

interface ReportAssets {
  [filepath: string]: {
    type: 'report' | 'baseline';
    source: string;
    filepath: string;
  };
}

const DEFAULT_OPTIONS = {
  html: true,
  json: false,
  compare: true,
  baseline: process.env.BUNDLE_STATS_BASELINE === 'true',
  outDir: '',
  silent: false,
};

export const generateReports = async (
  source: object,
  options: ReportOptions,
  pluginOptions: ReportPluginOptions = {},
): Promise<ReportAssets> => {
  const { compare, baseline, html, json, outDir } = merge({}, DEFAULT_OPTIONS, options);
  const { outputPath = process.cwd(), logger = console } = pluginOptions;

  const newAssets: ReportAssets = {};

  const data = filter(source);

  // Bundler builtAt might not be available yet
  if (!data.builtAt) {
    data.builtAt = Date.now();
  }

  const baselineAbsolutePath = getBaselinePath(outputPath, outDir, options.baselineFilepath);
  const baselineRelativePath = getBaselineRelativePath(outputPath, outDir, baselineAbsolutePath);

  // Log the configured value or the resolved one
  const baselinePublicPath = options.baselineFilepath
    ? options.baselineFilepath
    : baselineRelativePath;

  let baselineStats = null;

  // If compare mode, read baseline stats JSON file
  if (compare) {
    try {
      const baselineStatsData = await readBaseline(baselineAbsolutePath);
      baselineStats = filter(baselineStatsData);

      if (!options.silent) {
        logger.info(`${TEXT.BASELINE_READING} ${baselinePublicPath}.`);
      }
    } catch (err) {
      logger.warn(`${TEXT.BASELINE_READING} ${baselinePublicPath}. ${TEXT.BASELINE_MISSING}`);
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
    const relativeFilepath = path.join(outDir, filename);

    newAssets[relativeFilepath] = {
      type: 'report',
      source: output,
      filepath: path.join(outputPath, relativeFilepath),
    };
  });

  // Save baseline JSON file if option is set
  if (baseline) {
    newAssets[baselineRelativePath] = {
      type: 'baseline',
      source: JSON.stringify(data),
      filepath: baselineAbsolutePath,
    };

    if (!options.silent) {
      logger.info(`${TEXT.BASELINE_WRITING} ${baselineRelativePath}`);
    }
  }

  const info = getReportInfo(report);

  if (info && !options.silent) {
    logger.info(info.text);
  }

  return newAssets;
};
