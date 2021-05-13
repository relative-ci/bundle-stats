import get from 'lodash/get';
import pick from 'lodash/pick';

import {
  SECTION_WEBPACK_STATS,
  SECTION_WEBPACK_SIZES,
  SECTION_WEBPACK_ASSETS,
  SECTION_WEBPACK_MODULES,
  SECTION_WEBPACK_PACKAGES,
  SUMMARY_METRIC_PATHS,
} from './constants';
import { metrics as metricTypes } from './metrics';

/**
 *
 * Get stats metrics
 *
 * @param {Object} job Job data
 * @param {Object} job.metrics Job metrics
 * @param {Object} job.metrics.webpack Job webpack metrics
 *
 * @return {Object} Webpack stats metrics
 */
const getStatsMetrics = (job) => {
  const data = get(job, 'metrics.webpack');
  const metrics = pick(data, SUMMARY_METRIC_PATHS);

  // Rename metric keys
  return Object.entries(metrics).reduce((agg, [key, value]) => ({
    ...agg,
    [`webpack.${key}`]: value,
  }), {});
};

/**
 *
 * Get size metrics
 *
 * @param {Object} job Job data
 * @param {Object} job.metrics Job metrics
 * @param {Object} job.metrics.webpack Job webpack metrics
 * @param {Object} job.metrics.webpack.sizes Job webpack size metrics
 *
 * @return {Object} Webpack size metrics
 */
const getSizeMetrics = (job) => {
  const metrics = get(job, 'metrics.webpack.sizes', {});

  // List metrics by the metrics list
  return Object.keys(metricTypes.sizes).reduce((agg, key) => ({
    ...agg,
    [`webpack.sizes.${key}`]: metrics[key],
  }), {});
};

/**
 *
 * Get asset metrics
 *
 * @param {Object} job Job data
 * @param {Object} job.metrics Job metrics
 * @param {Object} job.metrics.webpack Job webpack metrics
 * @param {Object} job.metrics.webpack.assets Job webpack asset metrics
 *
 * @return {Object} Webpack asset metrics
 */
const getAssetsMetrics = (job) => get(job, 'metrics.webpack.assets', {});

/**
 *
 * Get module metrics
 *
 * @param {Object} job Job data
 * @param {Object} job.metrics Job metrics
 * @param {Object} job.metrics.webpack Job webpack metrics
 * @param {Object} job.metrics.webpack.modules Job webpack module metrics
 *
 * @return {Object} Webpack module metrics
 */
const getModulesMetrics = (job) => get(job, 'metrics.webpack.modules', {});

/**
 *
 * Get package metrics
 *
 * @param {Object} job Job data
 * @param {Object} job.metrics Job metrics
 * @param {Object} job.metrics.webpack Job webpack metrics
 * @param {Object} job.metrics.webpack.packages Job webpack package metrics
 *
 * @return {Object} Webpack package metrics
 */
const getPackageMetrics = (job) => get(job, 'metrics.webpack.packages', {});

export const selectors = {
  [SECTION_WEBPACK_STATS]: getStatsMetrics,
  [SECTION_WEBPACK_SIZES]: getSizeMetrics,
  [SECTION_WEBPACK_ASSETS]: getAssetsMetrics,
  [SECTION_WEBPACK_MODULES]: getModulesMetrics,
  [SECTION_WEBPACK_PACKAGES]: getPackageMetrics,
};
