import { last, map, round } from 'lodash';

import { createGetMetricType } from '../utils/metrics';
import { FILE_TYPE_OTHER, FILE_TYPE_PATTERNS } from '../config';
import { metrics } from './metrics';

const FILENAME_HASH_PATTERN = /[.|-][a-f0-9]{5,32}$/;

export const getFileType = (filename) => {
  const fileType = Object.entries(FILE_TYPE_PATTERNS).find(([, pattern]) => pattern.test(filename));

  return fileType ? fileType[0] : FILE_TYPE_OTHER;
};

/**
 * Extract (guess) filename from a hashed filename
 */
export const getAssetName = (assetFilepath) => {
  if (!assetFilepath) {
    return '';
  }

  const pathParts = assetFilepath.split('/');
  const dirname = pathParts.slice(0, -1).join('/');
  const filename = last(pathParts);

  const filenameParts = filename.split('.');

  const { basename, extension } =
    filenameParts.slice(-2, -1).join('') === 'min'
      ? {
          basename: filenameParts.slice(0, -2).join('.'),
          extension: filenameParts.slice(-2).join('.'),
        }
      : {
          basename: filenameParts.slice(0, -1).join('.'),
          extension: filenameParts.slice(-1).join('.'),
        };

  return `${dirname ? `${dirname}/` : ''}${basename.replace(
    FILENAME_HASH_PATTERN,
    '',
  )}.${extension}`;
};

// css ./node_modules/css-loader/dist/cjs.js??ref--6-0!./src/assets/styles/default.styl
const NAME_WITH_LOADERS = /!/;

// ./src/index.jsx + 27 modules
const NAME_WITH_MODULES = /\s\+\s\d*\smodules$/;

export const getModuleName = (moduleLabel) => {
  if (!moduleLabel) {
    return '';
  }

  if (NAME_WITH_LOADERS.test(moduleLabel)) {
    return last(moduleLabel.split(NAME_WITH_LOADERS));
  }

  if (NAME_WITH_MODULES.test(moduleLabel)) {
    return moduleLabel.replace(NAME_WITH_MODULES, '');
  }

  return moduleLabel;
};

/*
 * Calculate cache invalidation metric on the baseline data
 *
 * The metric is the ratio between the total file size of the files that have changed (exclude
 * deleted, added) and the total file size
 */
export const calculateCacheInvalidation = (rows) => {
  let cached = 0;
  let invalidated = 0;

  rows.forEach(({ changed, added, deleted, runs }) => {
    // Added and deleted files do not count towards the caching index
    if (added || deleted) {
      return;
    }

    if (changed) {
      invalidated += runs[1].value;
    }

    cached += runs[1].value;
  });

  if (cached === 0) {
    return 0;
  }

  return round((invalidated / cached) * 100, 2);
};

export const getMetricAdded = (runs) => {
  const [current, baseline] = map(runs, 'value');

  return Boolean(current !== null && !baseline);
};

export const getMetricDeleted = (runs) => {
  const [current, baseline] = map(runs, 'value');

  return Boolean(baseline !== null && !current);
};

/**
 * Get webpack metric data
 *
 * @param {String} key - Webpack metric key
 * @return {Object} Metric data
 */
export const getMetricType = createGetMetricType(metrics);
