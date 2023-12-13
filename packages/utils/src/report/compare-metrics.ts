import map from 'lodash/map';

import { getAddRowMetricData } from './add-row-metric-data';
import { mergeMetricsByKey } from './merge-metrics-by-key';
import * as types from './types';

export const compareMetrics = (
  jobs: Array<any>,
  selectMetrics: (job: any) => any,
  metricType?: string,
  rowTransformers?: Array<types.MetricReportRowTransformFn>,
): Array<types.ReportMetricRow> => {
  const data = map(jobs, selectMetrics);
  return mergeMetricsByKey(data, [
    getAddRowMetricData(metricType),
    ...(rowTransformers || []),
  ]) as Array<types.ReportMetricRow>;
};
