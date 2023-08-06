import mergeWith from 'lodash/mergeWith';

import * as types from './types';

type RunMetrics = Record<string, types.MetricValue>;

const mergeWithRuns =
  (runIndex: number, runsCount: number) =>
  (aggregated: any, currentRun: any): Array<types.MetricValue | null> => {
    // if there are no runs, just create an array with empty values
    const runs = aggregated || Array(runsCount).fill({ value: 0 });
    runs[runIndex] = currentRun;

    return runs;
  };

export const mergeMetricsByKey = (
  runs: Array<RunMetrics>,
  rowTransformers?: Array<(row: types.ReportRow) => types.ReportRow>,
): Array<types.ReportRow> => {
  const runsCount = runs.length;

  const metricsById = runs.reduce(
    (aggregated, run, index) => mergeWith(aggregated, run, mergeWithRuns(index, runsCount)),
    {} as Record<string, Array<types.MetricValue | null>>,
  );

  return Object.entries(metricsById).map(([key, value]) => {
    const row = { key, runs: value };

    if (!rowTransformers) {
      return row;
    }

    // Run all row transformations
    return rowTransformers.reduce(
      (aggregatedRow, rowTransformer) => rowTransformer(aggregatedRow),
      row,
    );
  });
};
