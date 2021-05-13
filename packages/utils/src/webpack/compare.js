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
 *
 * @return {Object[]} Compared stats metrics
 */
const compareStats = (jobs) => compareMetrics(jobs, selectors.stats);

/**
 * Compare size metrics
 *
 * @param {Object[]} jobs - List of jobs to compare
 *
 * @return {Object[]} Compared size metrics
 */
const compareSizes = (jobs) => compareMetrics(jobs, selectors.sizes);

/**
 * Compare asset metrics
 *
 * @param {Object[]} jobs - List of jobs to compare
 *
 * @return {Object[]} Compared asset metrics
 */
const compareAssets = (jobs) => compareMetrics(jobs, selectors.assets, METRIC_TYPE_FILE_SIZE);

/**
 * Compare all modules
 *
 * @param {Object[]} jobs - List of jobs to compare
 * @return {Object[]} Compared module metrics
 */
const compareModules = (jobs) => compareMetrics(jobs, selectors.modules, METRIC_TYPE_FILE_SIZE);

/**
 * Compare package metrics
 *
 * @param {Object[]} jobs - List of jobs to compare
 *
 * @return {Object[]} Compared package metrics
 */
const comparePackages = (jobs) => compareMetrics(jobs, selectors.packages, METRIC_TYPE_FILE_SIZE);

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
