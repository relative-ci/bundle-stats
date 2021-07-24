import map from 'lodash/map';

import { getAddRowMetricData } from './add-row-metric-data';
import { mergeMetricsByKey } from './merge-metrics-by-key';

export const compareMetrics = (
  jobs: Array<any>,
  selectMetrics: (job: any) => any,
  metricType: string,
) => {
  const data = map(jobs, selectMetrics);

  return mergeMetricsByKey(data, [getAddRowMetricData(metricType)]);
};
