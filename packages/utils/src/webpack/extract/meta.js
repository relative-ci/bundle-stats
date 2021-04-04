import get from 'lodash/get';

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

  return {
    meta: {
      builtAt,
      hash,
    },
  };
};
