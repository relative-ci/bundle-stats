import { map } from 'lodash';

import { addRowData } from './add-row-data';
import { mergeRunsById } from './merge-runs-by-id';

export const compareMetrics = (jobs, selectMetrics, metricType) => {
  const data = map(jobs, selectMetrics);
  const rows = mergeRunsById(data);

  return rows.map((row) => addRowData(row, metricType));
};
