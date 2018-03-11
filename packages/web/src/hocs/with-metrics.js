import { withProps } from 'recompose';

import createRows from '../../../core/utils/rows';

const withMetrics = () => withProps(({ runs }) => ({
  rows: createRows(runs),
}));

export default withMetrics;
