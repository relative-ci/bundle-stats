import map from 'lodash/map';

import { getAddRowMetricData } from './add-row-metric-data';
import { mergeMetricsByKey } from './merge-metrics-by-key';
import * as types from './types';

export const compareMetrics = (
  jobs: Array<any>,
  selectMetrics: (job: any) => any,
  metricType?: string,
  rowTransformers?: Array<types.ReportMetricRowTransformFn>,
): Array<types.ReportMetricRow> => {
  const data = map(jobs, selectMetrics);
  // `getAddRowMetricData` always runs first, turning the raw `ReportRow` into a
  // `ReportMetricRow` before any of the (already-typed) `rowTransformers` run.
  return mergeMetricsByKey(data, [
    getAddRowMetricData(metricType),
    ...(rowTransformers || []),
  ] as Array<types.MetricReportRowTransformFn>) as Array<types.ReportMetricRow>;
};
