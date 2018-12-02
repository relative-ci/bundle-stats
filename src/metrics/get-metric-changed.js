import { map, uniq } from 'lodash';

export const getMetricChanged = (runs) => {
  const values = map(runs, 'value');

  return uniq(values).length > 1;
};
