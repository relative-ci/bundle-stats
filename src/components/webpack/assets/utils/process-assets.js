import { last, map, uniq } from 'lodash';

const checkIfChanged = values => uniq(values).length !== 1;
const checkIfAdded = values => !last(values);
const checkIfDeleted = values => !values[0];

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
