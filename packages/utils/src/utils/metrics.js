import { get } from 'lodash';

import METRICS, { METRIC_TYPE_NUMERIC, METRIC_TYPES } from '../config/metrics';

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
 *
 * @return @Metric
 */
export const getMetricType = (key, type) => {
  const metric = get(METRICS, key);

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
