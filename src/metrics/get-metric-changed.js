import { map, uniq } from 'lodash';

export const getMetricChanged = (runs) => {
  const uniqValues = uniq(map(runs, 'value'));

  if (uniqValues.length > 1) {
    return true;
  }

  const uniqNames = uniq(map(runs, 'name'));

  if (uniqNames.length > 1) {
    return true;
  }

  return false;
};
