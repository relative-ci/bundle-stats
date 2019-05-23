import { map } from 'lodash';

export const getMetricAdded = (runs) => {
  const [current, baseline] = map(runs, 'value');

  return Boolean(current !== null && !baseline);
};

export const getMetricDeleted = (runs) => {
  const [current, baseline] = map(runs, 'value');

  return Boolean(baseline !== null && !current);
};
