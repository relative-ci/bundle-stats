import { getDelta, formatDelta } from '../utils/delta';
import { formatPercentage } from '../utils/format';
import { getMetricType } from '../utils/metrics';
import { getMetricChanged } from './get-metric-changed';

export const addRowData = (row, metricType) => {
  const { key, runs } = row;

  // Resolve row metric
  // - if the key is a predefined metric, use it
  // - if the key is not matching an existing metric, use the default metricType
  const { biggerIsBetter, label, formatter } = getMetricType(
    key,
    typeof metricType === 'string' && metricType, // explicit, avoid passing of map cb params
  );

  return {
    ...row,

    // Metric props
    biggerIsBetter,
    label,

    // Row props
    changed: getMetricChanged(runs),

    // Runs
    runs: runs.map((run, index) => {
      if (!run || typeof run.value === 'undefined' || run.value === null) {
        return null;
      }

      const { value, ...restRun } = run;
      const diff = (index < runs.length - 1) ? getDelta(runs[index + 1], run) : null;

      return {
        ...restRun,

        // run data
        value,
        displayValue: formatter(run.value),

        // diff data
        ...(diff !== null) ? {
          ...diff,
          displayDelta: formatDelta(diff.delta, formatter),
          displayDeltaPercentage: formatDelta(diff.deltaPercentage, formatPercentage),
        } : {},
      };
    }),
  };
};
