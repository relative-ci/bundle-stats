import { map, uniq } from 'lodash';

const checkIfChanged = values => uniq(values).length !== 1;

const formatDataSet = assets =>
  Object.entries(assets).reduce((aggregator, [key, asset]) => {
    const entries = asset.entries.map((entry) => {
      if (entry) {
        return {
          name: entry.name,
          value: entry.size,
        };
      }

      return {
        value: 0,
      };
    });

    const sizes = map(entries, 'value');

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

export default formatDataSet;
