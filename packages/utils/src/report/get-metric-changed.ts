import uniq from 'lodash/uniq';
import map from 'lodash/map';

import * as types from './types';

export const getMetricChanged = (runs: Array<types.MetricValue | null>): boolean => {
  const uniqValues = uniq(map(runs, 'value'));

  if (uniqValues.length > 1) {
    return true;
  }

  // Check if the name prop has changed (eg: assets, modules)
  const uniqNames = uniq(map(runs, 'name'));

  if (uniqNames.length > 1) {
    return true;
  }

  return false;
};
