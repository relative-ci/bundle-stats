import { withProps } from 'recompose';

import getMeta from './utils/get-meta';

const createRun = (metricsMap, metaMap, length) => (source, index) => ({
  label: `Job #${index + 1}${length === index + 1 ? ' (baseline)' : ''}`,
  meta: getMeta(source.res, metaMap),
});

const enhance = (metricsMap, metaMap) => withProps(({ sources }) => ({
  runs: sources.map(createRun(metricsMap, metaMap, sources.length)),
}));

export default enhance;
