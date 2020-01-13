import { map, uniq } from 'lodash';

/**
 * Check if metric is changed over runs
 *
 * @param {Object[]} runs List of runs
 * @param {number} runs[].value The metric value
 * @param {string} [runs[].name] The metric original name
 * @return {boolean} Metric changed flag
 */
export const getMetricChanged = (runs) => {
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
