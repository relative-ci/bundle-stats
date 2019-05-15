import { withProps } from 'recompose';

import { generateRows } from '../utils/generate-rows';

const withMetrics = () => withProps(({ runs }) => ({
  rows: generateRows(runs),
}));

export default withMetrics;
