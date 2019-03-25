import { withProps } from 'recompose';
import { flow } from 'lodash/fp';
import { map } from 'lodash';
import { mergeRunsById } from '@relative-ci/utils';

import resolveMetricChanged from '../utils/resolve-metric-changed';
import computeDelta from '../utils/compute-delta';

const generateRows = runs => flow(
  mergeRunsById,
  resolveMetricChanged,
  computeDelta,
)(map(runs, 'data'));

const withMetrics = () => withProps(({ runs }) => ({
  rows: generateRows(runs),
}));

export default withMetrics;
