import { get } from 'lodash';

import METRICS, { METRIC_TYPE_NUMERIC, METRIC_TYPES } from '../config/metrics';

const getMetric = (key, type) => {
  const metric = get(METRICS, key, {
    label: key,
    type: type || METRIC_TYPE_NUMERIC,
  });

  return {
    label: metric.label,
    ...METRIC_TYPES[metric.type],
  };
};

export default getMetric;
