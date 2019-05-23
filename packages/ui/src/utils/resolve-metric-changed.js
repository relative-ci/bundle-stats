import { getMetricChanged } from '@bundle-stats/utils';

const resolveMetricChanged = metrics => metrics.map((metric) => {
  const changed = getMetricChanged(metric.runs);

  return {
    ...metric,
    changed,
  };
});

export default resolveMetricChanged;
