import { withProps } from 'recompose';

import getMeta from './utils/get-meta';

const createRun = (metricsMap, metaMap) => (source, index) => ({
  label: `Run #${index}`,
  meta: getMeta(source.res, metaMap),
});

const enhance = (metricsMap, metaMap) => withProps(({ sources }) => ({
  runs: sources.map(createRun(metricsMap, metaMap)),
}));

export default enhance;
