import { map } from 'lodash';

import { addRowData } from './add-row-data';
import { mergeMetricsByKey } from './merge-metrics-by-key';

export const compareMetrics = (jobs, selectMetrics, metricType) => {
  const data = map(jobs, selectMetrics);
  const rows = mergeMetricsByKey(data);

  return rows.map((row) => addRowData(row, metricType));
};
