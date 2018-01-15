import { map, round, uniq } from 'lodash';

const getDelta = (baseline, current) => {
  const baselineValue = baseline && baseline.size || 0; // eslint-disable-line no-mixed-operators
  const currentValue = current && current.size || 0; // eslint-disable-line no-mixed-operators

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
      (typeof entries[index + 1] !== 'undefined')
        ? { delta: getDelta(entries[index + 1], asset) }
        : {},
    ),
  ], []);

const checkIfChanged = values => uniq(values).length !== 1;

const processAssets = assets =>
  Object.entries(assets).reduce((aggregator, [key, asset]) => {
    const sizes = map(asset.entries, 'size');
    const entries = getEntriesDelta(asset.entries);

    return [
      ...aggregator,
      {
        key,
        data: {
          changed: checkIfChanged(sizes),
        },
        entries,
      },
    ];
  }, []);

export default processAssets;
