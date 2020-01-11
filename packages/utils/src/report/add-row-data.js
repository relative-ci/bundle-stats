import { getDelta, formatDelta } from '../utils/delta';
import { formatPercentage } from '../utils/format';
import { getMetricChanged } from '../metrics/get-metric-changed';
import { getMetricType } from '../metrics/get-metric-type';

export const addRowData = (entries, metricType, metricPrefix = '') => entries.map((entry) => {
  const { runs } = entry;

  const { biggerIsBetter, label, formatter } = getMetricType(
    metricPrefix ? [metricPrefix, entry.key].join('.') : entry.key,
    metricType,
  );

  return {
    ...entry,

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
});
