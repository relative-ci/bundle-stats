import { get } from 'lodash';

export const getStatsByMetrics = (stats, metricIds) => metricIds.reduce((agg, metricId) => {
  const value = get(stats, `${metricId}.value`, 0);

  return {
    ...agg,
    [metricId]: { value },
  };
}, {});
