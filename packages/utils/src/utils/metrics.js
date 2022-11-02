import get from 'lodash/get';

import { METRIC_TYPE_NUMERIC, METRIC_TYPES } from '../config/metrics';
import { formatDelta, getDelta, getDeltaType } from './delta';
import { formatPercentage } from './format';

import { metrics as webpackMetricTypes } from '../webpack/metrics';
import { metrics as lighthouseMetricTypes } from '../lighthouse/metrics';
import { metrics as browsertimeMeticTypes } from '../browsertime/metrics';

/**
 * Create getMetricTypes handler
 *
 * @param {Object} metrics
 * @return {Function}
 */
export const createGetMetricType =
  (metrics) =>
  /**
   * Get metric type data
   *
   * @param {String} key Metric key
   * @param {String} [type] Default metric type
   * @return {import('../constants').MetricType}
   */
  // eslint-disable-next-line implicit-arrow-linebreak
  (key, type) => {
    /** @type {import('../constants').MetricTypeConfig} */
    const metric = get(metrics, key);

    if (metric && metric.type) {
      return {
        ...METRIC_TYPES[metric.type],
        ...metric,
      };
    }

    const resolvedType = type || METRIC_TYPE_NUMERIC;

    return {
      ...METRIC_TYPES[resolvedType],
      type: resolvedType,
      label: key,
    };
  };

/**
 * Get global metric type
 *
 * @param {String} key Metric key
 * @param {import('../constants').MetricTypeType} [type] Default metric type
 * @return {import('../constants').MetricType}
 */
export const getGlobalMetricType = createGetMetricType({
  webpack: webpackMetricTypes,
  lighthouse: lighthouseMetricTypes,
  browsertime: browsertimeMeticTypes,
});

/**
 *
 * Get metric information
 *
 * @param {import('../constants').MetricType} metric Metric data
 * @param {number} currentValue Current value
 * @param {number} baselineValue Baseline value
 *
 * @return {import('../constants').MetricRunInfo}
 */
export const getMetricRunInfo = (metric, currentValue, baselineValue) => {
  const { formatter, biggerIsBetter } = metric;

  const runInfo = {
    value: currentValue,
    displayValue: formatter(currentValue),
  };

  if (typeof baselineValue === 'undefined') {
    return runInfo;
  }

  const { delta, deltaPercentage } = getDelta({ value: baselineValue }, { value: currentValue });

  return {
    ...runInfo,
    delta,
    deltaPercentage,
    displayDelta: formatDelta(delta, formatter),
    displayDeltaPercentage: formatDelta(deltaPercentage, formatPercentage),
    deltaType: getDeltaType(deltaPercentage, biggerIsBetter),
  };
};
