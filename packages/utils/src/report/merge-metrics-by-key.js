import fill from 'lodash/fill';
import map from 'lodash/map';
import mergeWith from 'lodash/mergeWith';

const mergeWithRuns = (index, count) => (objValue, srcValue) => {
  // if there are no runs, just create an array and fill it with null
  const res = objValue && objValue.runs
    ? [...objValue.runs]
    : fill(Array(count), null);

  res[index] = srcValue;

  return {
    runs: res,
  };
};

export const mergeMetricsByKey = (runs) => {
  const runsCount = runs.length;

  const metricsById = runs.reduce(
    (aggregator, run, index) => mergeWith(
      aggregator,
      run,
      mergeWithRuns(index, runsCount),
    ),
    {},
  );

  return map(metricsById, (value, key) => ({
    key,
    ...value,
  }));
};
