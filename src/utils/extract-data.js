const {
  flow,
  fromPairs,
  get,
  map,
  filter,
  pick,
  toPairs,
} = require('lodash/fp');

const PATH_IGNORE_PATTERN = '.map$';

/**
 * Extract assets, entrypoints, chunks, from the webpack stats
 */
export const extractDataFromWebpackStats = (source, options = {}) => {
  const pathIgnorePattern = new RegExp(options.pathIgnorePattern || PATH_IGNORE_PATTERN);

  const assets = flow(
    get('assets'),
    map(pick(['name', 'size'])),
    filter(({ name }) => !pathIgnorePattern.test(name)),
  )(source);

  const entrypoints = flow(
    get('entrypoints'),
    toPairs,
    map(([key, value]) => [
      key,
      pick('assets')(value),
    ]),
    fromPairs,
  )(source);

  const chunks = flow(
    get('chunks'),
    map(pick(['id', 'entry', 'initial', 'files', 'names'])),
  )(source);

  const modules = flow(
    get('modules'),
    map(pick(['name', 'size', 'chunks'])),
  )(source);

  return {
    assets,
    entrypoints,
    chunks,
    modules,
  };
};
