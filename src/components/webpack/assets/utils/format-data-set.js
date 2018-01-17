import { map, uniq } from 'lodash';

const checkIfChanged = values => uniq(values).length !== 1;

const formatDataSet = metrics =>
  Object.entries(metrics).reduce((aggregator, [key, metric]) => {
    const runs = metric.runs.map((entry) => {
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

    const sizes = map(runs, 'value');

    return [
      ...aggregator,
      {
        key,
        data: {
          changed: checkIfChanged(sizes),
        },
        runs,
      },
    ];
  }, []);

export default formatDataSet;
