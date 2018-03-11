import { flow } from 'lodash/fp';
import { map } from 'lodash';

import mergeRunsById from './merge-runs-by-id';
import resolveMetricChanged from './resolve-metric-changed';
import computeDelta from './compute-delta';

const createRows = runs => flow(
  mergeRunsById,
  resolveMetricChanged,
  computeDelta,
)(map(runs, 'data'));

export default createRows;
