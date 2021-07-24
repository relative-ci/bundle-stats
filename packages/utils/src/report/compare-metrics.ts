import map from 'lodash/map';

import { addRowData } from './add-row-data';
import { mergeMetricsByKey } from './merge-metrics-by-key';

export const compareMetrics = (
  jobs: Array<any>,
  selectMetrics: (job: any) => any,
  metricType: string,
) => {
  const data = map(jobs, selectMetrics);
  const rows = mergeMetricsByKey(data);

  return rows.map((row) => addRowData(row, metricType));
};
