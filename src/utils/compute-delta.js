import { merge, round } from 'lodash';

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

const formatDelta = (value) => {
  const sign = value >= 0 ? '+' : '';

  return `${sign}${value}%`;
};

const getEntriesDelta = entries =>
  entries.reduce((aggregator, asset, index) => {
    const deltaInfo = {};

    if (index > 0) {
      deltaInfo.delta = getDelta(entries[index - 1], asset);
      deltaInfo.displayDelta = formatDelta(deltaInfo.delta);
    }

    return [
      ...aggregator,
      merge(
        asset,
        deltaInfo,
      ),
    ];
  }, []);

const computeDelta = dataSet =>
  dataSet.map(({ entries, ...restProps }) => ({
    ...restProps,
    entries: getEntriesDelta(entries),
  }));

export default computeDelta;
