import { get, set } from 'lodash';

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

export const metaWebpackTransform = (webpackStats) => {
  const builtAt = getBuiltAt(webpackStats, 'builtAt');
  const hash = get(webpackStats, 'hash', '');

  return set({}, 'meta.webpack.stats', { builtAt, hash });
};
