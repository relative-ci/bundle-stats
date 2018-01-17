import { map, uniq } from 'lodash';

const resolveMetricChanged = metrics =>
  metrics.map((metric) => {
    const values = map(metric.runs, 'value');
    const changed = uniq(values).length > 1;

    return {
      ...metric,
      changed,
    };
  });

export default resolveMetricChanged;
