import { fill, mergeWith } from 'lodash';

const mergeWithRuns = (index, count) => (objValue, srcValue) => {
  // if there are no runs, just create an array and fill it with null
  const res = objValue && objValue.runs
    ? [...objValue.runs]
    : fill(Array(count), null);

  res[index] = srcValue;

  return { runs: res };
};

/*
 * Merge all assetsById
 */
const mergeRunsById = (runs) => {
  const runsCount = runs.length;

  return runs.reduce(
    (aggregator, run, index) =>
      mergeWith(
        aggregator,
        run,
        mergeWithRuns(index, runsCount),
      ),
    {},
  );
};

export default mergeRunsById;
