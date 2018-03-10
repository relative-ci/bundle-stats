import { withProps } from 'recompose';

import getMetrics from './utils/get-metrics';
import getMeta from './utils/get-meta';

const createRun = (metricsMap, metaMap) => (source, index) => ({
  label: `Run #${index}`,
  meta: getMeta(source.res, metaMap),
  data: getMetrics(source.res, metricsMap),
});

const enhance = (metricsMap, metaMap) => withProps(({ sources }) => ({
  runs: sources.map(createRun(metricsMap, metaMap)),
}));

export default enhance;
