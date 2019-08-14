import { withProps } from 'recompose';

import getMeta from './utils/get-meta';

const createRun = (metaMap, length) => (source, index) => ({
  label: `Job #${index + 1}${length === index + 1 ? ' (baseline)' : ''}`,
  meta: getMeta(source.res, metaMap),
});

const enhance = (metaMap) => withProps(({ sources }) => ({
  runs: sources.map(createRun(metaMap, sources.length)),
}));

export default enhance;
