import { round } from 'lodash';

const getDelta = (baseline, current) => {
  const baselineValue = baseline.value;
  const currentValue = current.value;

  if (baselineValue === currentValue) {
    return 0;
  }

  if (baselineValue === 0) {
    return 100;
  }

  const change = currentValue / baselineValue * 100; // eslint-disable-line no-mixed-operators

  return round(change - 100, 2);
};

// The first entry is the latest,
const getEntriesDelta = entries =>
  entries.reduce((aggregator, asset, index) => [
    ...aggregator,
    Object.assign(
      {},
      asset,
      index > 0
        ? { delta: getDelta(entries[index - 1], asset) }
        : {},
    ),
  ], []);

const computeDelta = dataSet =>
  dataSet.map(({ entries, ...restProps }) => ({
    ...restProps,
    entries: getEntriesDelta(entries),
  }));

export default computeDelta;
