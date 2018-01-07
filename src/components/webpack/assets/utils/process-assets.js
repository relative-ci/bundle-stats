import { last, map, uniq } from 'lodash';

const checkIfChanged = values => uniq(values).length !== 1;
const checkIfAdded = values => typeof last(values) === 'undefined';
const checkIfDeleted = values => typeof values[0] === 'undefined';

const processAssets = assets =>
  Object.entries(assets).reduce(
    (aggregator, [key, asset]) => {
      const sizes = map(asset.entries, 'size');

      return [
        ...aggregator,
        {
          ...asset,
          key,
          data: {
            changed: checkIfChanged(sizes),
            added: checkIfAdded(sizes),
            deleted: checkIfDeleted(sizes),
          },
        },
      ];
    },
    [],
  );

export default processAssets;
