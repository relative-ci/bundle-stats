import { get } from 'lodash';

import METRICS, { METRIC_TYPE_NUMERIC, METRIC_TYPES } from '../config/metrics';
import { formatDelta, getDelta, getDeltaType } from './delta';
import { formatPercentage } from './format';

import { metrics as webpackMetricTypes } from '../webpack/metrics';

/**
 * Create getMetricTypes handler
 *
 * @param {Object} metrics
 * @return {Function}
 */
export const createGetMetricType = (metrics) =>
  /**
   * Get metric type data
   *
   * @param {String} key Metric key
   * @param {String} [type] Default metric type
   *
   * @typedef {Object} Metric
   * @property {String} label Metric label
   * @property {String} type Metric type
   * @property {Function} formatter Metric format handler
   * @property {Boolean} biggerIsBetter Metric flag
   * @return {Metric}
   */
  (key, type) => {
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
 * @param {String} [type] Default metric type
 *
 * @typedef {Object} Metric
 * @property {String} label Metric label
 * @property {String} type Metric type
 * @property {Function} formatter Metric format handler
 * @property {Boolean} biggerIsBetter Metric flag
 * @return {Metric}
 */
export const getGlobalMetricType = createGetMetricType({ ...METRICS, webpack: webpackMetricTypes });


/**
 *
 * Get metric information
 *
 * @param {Object} metric Metric data
 * @param {Function} metric.formatter Metric formatter
 * @param {Boolean} metric.biggerIsBetter Metric flag
 * @param {number} currentValue Current value
 * @param {number} baselineValue Baseline value
 *
 * @typedef {Object} MetricInfo
 * @property {number} value Metric value
 * @property {string} displayValue Metric display value
 * @property {number} delta Metric delta value
 * @property {string} displayDelta Metric display delta value
 * @property {string} displayDeltaPercentage Metric displat delta percentage
 * @property {string} deltaType Metric delta type
 *
 * @return @MetricInfo
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
