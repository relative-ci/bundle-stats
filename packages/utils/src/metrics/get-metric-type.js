import { get } from 'lodash';

import METRICS, { METRIC_TYPE_NUMERIC, METRIC_TYPES } from '../config/metrics';

export const getMetricType = (key, type) => {
  const metric = get(METRICS, key, {
    label: key,
    type: type || METRIC_TYPE_NUMERIC,
  });

  return {
    ...METRIC_TYPES[metric.type],
    ...metric,
  };
};
