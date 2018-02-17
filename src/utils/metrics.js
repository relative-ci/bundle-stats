import { get } from 'lodash';

import METRICS, { METRIC_TYPE_NUMERIC, METRIC_TYPES } from '../config/metrics';

const getMetric = (key) => {
  const { label, type } = get(METRICS, key, {
    label: key,
    type: METRIC_TYPE_NUMERIC,
  });

  return {
    label,
    ...METRIC_TYPES[type],
  };
};

export default getMetric;
