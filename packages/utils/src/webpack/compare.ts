import { MetricTypes } from '../constants';
import { compareMetrics } from '../report/compare-metrics';
import { MetricReportRowTransformFn } from '../report/types';
import {
  SECTION_WEBPACK_STATS,
  SECTION_WEBPACK_SIZES,
  SECTION_WEBPACK_ASSETS,
  SECTION_WEBPACK_MODULES,
  SECTION_WEBPACK_PACKAGES,
  SECTIONS,
} from './constants';
import { selectors, getModulesDuplicateSizeMetrics, getModulesTotalSizeMetrics } from './selectors';

const compareStats = (jobs: Array<unknown>, rowTransformers?: Array<MetricReportRowTransformFn>) =>
  compareMetrics(jobs, selectors.stats, undefined, rowTransformers);

const compareSizes = (jobs: Array<unknown>, rowTransformers?: Array<MetricReportRowTransformFn>) =>
  compareMetrics(jobs, selectors.sizes, undefined, rowTransformers);

const compareAssets = (jobs: Array<unknown>, rowTransformers?: Array<MetricReportRowTransformFn>) =>
  compareMetrics(jobs, selectors.assets, MetricTypes.FileSize, rowTransformers);

const compareModules = (
  jobs: Array<unknown>,
  rowTransformers?: Array<MetricReportRowTransformFn>,
) => compareMetrics(jobs, selectors.modules, MetricTypes.FileSize, rowTransformers);

export const compareModuleDuplicateSize = (
  jobs: Array<unknown>,
  rowTransformers?: Array<MetricReportRowTransformFn>,
) => compareMetrics(jobs, getModulesDuplicateSizeMetrics, MetricTypes.FileSize, rowTransformers);

export const compareModuleTotalSize = (
  jobs: Array<unknown>,
  rowTransformers?: Array<MetricReportRowTransformFn>,
) => compareMetrics(jobs, getModulesTotalSizeMetrics, MetricTypes.FileSize, rowTransformers);

const comparePackages = (
  jobs: Array<unknown>,
  rowTransformers?: Array<MetricReportRowTransformFn>,
) => compareMetrics(jobs, selectors.packages, MetricTypes.FileSize, rowTransformers);

export const compareBySection = {
  [SECTION_WEBPACK_STATS]: compareStats,
  [SECTION_WEBPACK_SIZES]: compareSizes,
  [SECTION_WEBPACK_ASSETS]: compareAssets,
  [SECTION_WEBPACK_MODULES]: compareModules,
  [SECTION_WEBPACK_PACKAGES]: comparePackages,
};

/* eslint-disable prettier/prettier */
/**
 * Compare webpack sections
 */
export const compare = (jobs: Array<unknown>) => SECTIONS.reduce(
  (agg, sectionId) => ({
    ...agg,
    [sectionId]: compareBySection[sectionId as keyof typeof compareBySection](jobs),
  }),
  {},
);
/* eslint-enable prettier/prettier */
