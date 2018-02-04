import { withProps } from 'recompose';

import computeDelta from '../../../utils/compute-delta';
import mergeRunsById from '../../../utils/merge-runs-by-id';
import resolveMetricChanged from '../../../utils/resolve-metric-changed';
import formatDataSet from './utils/format-data-set';

const getRows = (runs) => {
  const stats = runs.map(({ data }) => data);

  return computeDelta(resolveMetricChanged(formatDataSet(mergeRunsById(stats))));
};

const enhance = withProps(({ runs }) => ({
  runs,
  rows: getRows(runs),
}));

export default enhance;
