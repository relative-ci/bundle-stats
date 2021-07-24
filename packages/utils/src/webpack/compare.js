import { METRIC_TYPE_FILE_SIZE } from '../config/metrics';
import { compareMetrics } from '../report/compare-metrics';
import {
  SECTION_WEBPACK_STATS,
  SECTION_WEBPACK_SIZES,
  SECTION_WEBPACK_ASSETS,
  SECTION_WEBPACK_MODULES,
  SECTION_WEBPACK_PACKAGES,
  SECTIONS,
} from './constants';
import { selectors } from './selectors';

/**
 * Compare stats metrics
 *
 * @param {Object[]} jobs - List of jobs to compare
 * @param {Array<Function>} [rowTransformers]
 *
 * @return {Object[]} Compared stats metrics
 */
const compareStats = (jobs, rowTransformers) => compareMetrics(
  jobs, selectors.stats, undefined, rowTransformers,
);

/**
 * Compare size metrics
 *
 * @param {Object[]} jobs - List of jobs to compare
 * @param {Array<Function>} [rowTransformers]
 *
 * @return {Object[]} Compared size metrics
 */
const compareSizes = (jobs, rowTransformers) => compareMetrics(jobs, selectors.sizes, undefined, rowTransformers);

/**
 * Compare asset metrics
 *
 * @param {Object[]} jobs - List of jobs to compare
 * @param {Array<Function>} [rowTransformers]
 *
 * @return {Object[]} Compared asset metrics
 */
const compareAssets = (jobs, rowTransformers) => compareMetrics(jobs, selectors.assets, METRIC_TYPE_FILE_SIZE, rowTransformers);

/**
 * Compare all modules
 *
 * @param {Object[]} jobs - List of jobs to compare
 * @param {Array<Function>} [rowTransformers]
 * @return {Object[]} Compared module metrics
 */
const compareModules = (jobs, rowTransformers) => compareMetrics(jobs, selectors.modules, METRIC_TYPE_FILE_SIZE, rowTransformers);

/**
 * Compare package metrics
 *
 * @param {Object[]} jobs - List of jobs to compare
 * @param {Array<Function>} [rowTransformers]
 *
 * @return {Object[]} Compared package metrics
 */
const comparePackages = (jobs, rowTransformers) => compareMetrics(jobs, selectors.packages, METRIC_TYPE_FILE_SIZE, rowTransformers);

export const compareBySection = {
  [SECTION_WEBPACK_STATS]: compareStats,
  [SECTION_WEBPACK_SIZES]: compareSizes,
  [SECTION_WEBPACK_ASSETS]: compareAssets,
  [SECTION_WEBPACK_MODULES]: compareModules,
  [SECTION_WEBPACK_PACKAGES]: comparePackages,
};

/**
 * Compare webpack sections
 *
 * @param {Object[]} jobs - List of jobs to compare
 * @return {Object} Compared metrics by section
 */
export const compare = (jobs) => SECTIONS.reduce((agg, sectionId) => ({
  ...agg,
  [sectionId]: compareBySection[sectionId](jobs),
}), {});
