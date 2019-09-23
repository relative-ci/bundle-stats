import { get } from 'lodash';

import METRICS, { METRIC_TYPE_NUMERIC, METRIC_TYPES } from '../config/metrics';

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
