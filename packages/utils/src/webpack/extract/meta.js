import { get, set } from 'lodash';

import { SOURCE_PATH_WEBPACK_STATS } from '../../config';

const getBuiltAt = (webpackStats, key) => {
  let builtAt = '';
  const builtAtTime = get(webpackStats, key);

  if (!builtAtTime) {
    return builtAt;
  }

  try {
    builtAt = (new Date(builtAtTime)).toISOString();
  } catch (error) {
    console.error('Error extracting builtAt value:', error.message); // eslint-disable-line no-console
  }

  return builtAt;
};

export const extractMeta = (webpackStats) => {
  const builtAt = getBuiltAt(webpackStats, 'builtAt');
  const hash = get(webpackStats, 'hash', '');

  return set({}, `meta.${SOURCE_PATH_WEBPACK_STATS}`, { builtAt, hash });
};
