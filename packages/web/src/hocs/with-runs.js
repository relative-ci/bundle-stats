import { withProps } from 'recompose';

import createRun from '../../../core/utils/runs';

const enhance = (metricsMap, metaMap) => withProps(({ sources }) => ({
  runs: sources.map(createRun(metricsMap, metaMap)),
}));

export default enhance;
