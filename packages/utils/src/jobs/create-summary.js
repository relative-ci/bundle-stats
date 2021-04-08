import get from 'lodash/get';
import merge from 'lodash/merge';

export const createSummary = (
  metricPaths, baselineSourceMetrics, currentSourceMetrics,
) => metricPaths.map((metric) => {
  const baselineValue = get(baselineSourceMetrics, `${metric}.value`, 0);
  const currentValue = get(currentSourceMetrics, `${metric}.value`, 0);

  return {
    [metric]: {
      baseline: baselineValue,
      current: currentValue,
    },
  };
}).reduce((agg, current) => merge({}, agg, current), {});
