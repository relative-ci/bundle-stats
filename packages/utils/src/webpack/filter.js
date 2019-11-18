import {
  flow,
  fromPairs,
  get,
  map,
  filter as _filter,
  pick,
  toPairs,
} from 'lodash/fp';

const PATH_IGNORE_PATTERN = '.map$';

/**
 * Filter webpack stats data
 */
export const filter = (source, options = {}) => {
  const pathIgnorePattern = new RegExp(options.pathIgnorePattern || PATH_IGNORE_PATTERN);

  // meta
  const builtAt = get('builtAt')(source);
  const hash = get('hash')(source);

  // rawData
  const assets = flow([
    get('assets'),
    map(pick(['name', 'size'])),
    _filter(({ name }) => !pathIgnorePattern.test(name)),
  ])(source);

  const entrypoints = flow([
    get('entrypoints'),
    toPairs,
    map(([key, value]) => [
      key,
      pick('assets')(value),
    ]),
    fromPairs,
  ])(source);

  const chunks = flow([
    get('chunks'),
    map(pick(['id', 'entry', 'initial', 'files', 'names'])),
  ])(source);

  const modules = flow([
    get('modules'),
    map(pick(['name', 'size', 'chunks'])),
  ])(source);

  return {
    builtAt,
    hash,
    assets,
    entrypoints,
    chunks,
    modules,
  };
};
