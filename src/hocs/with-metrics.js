import { withProps } from 'recompose';

import mergeRunsById from '../utils/merge-runs-by-id';
import resolveMetricChanged from '../utils/resolve-metric-changed';
import computeDelta from '../utils/compute-delta';

// Tmp transformation done by formatDataSet
const transformMetricToArray = metricsById =>
  Object.entries(metricsById).map(([key, value]) => ({
    key,
    ...value,
  }));

const generateRows = runs =>
  computeDelta(resolveMetricChanged(transformMetricToArray(mergeRunsById(runs.map(({ data }) =>
    data)))));

const withMetrics = () => withProps(({ runs }) => ({
  runs,
  rows: generateRows(runs),
}));

export default withMetrics;
