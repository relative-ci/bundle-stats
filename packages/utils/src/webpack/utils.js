import last from 'lodash/last';
import map from 'lodash/map';
import round from 'lodash/round';

import { PACKAGES_SEPARATOR, PACKAGE_ID_SEPARATOR } from '../config';
import { createGetMetricType } from '../utils/metrics';
import { metrics } from './metrics';

// Md5 hash matcher
const HASH_PATTERN = '[a-f|0-9]{5,32}';

// Match has prefix
const HASH_SEPARATOR_PATTERN = '[-|.]';

// Match multiple extensions: .js, .js.gz, .min.js, .chunk.js
const EXTENSION_PATTERN = /(?:\.[a-z|0-9]{2,}){1,}/;

const PATTERNS = [
  // Match path/name-HASH.ext, path/name.HASH.ext, path/name-HASH.chunk.ext
  `(.*)${HASH_SEPARATOR_PATTERN}${HASH_PATTERN}(${EXTENSION_PATTERN.source})$`,

  // Match static/HASH
  `(static)/${HASH_PATTERN}(.*${EXTENSION_PATTERN.source})$`,
].map((pattern) => new RegExp(pattern));

const NO_BASENAME = /(^|.*\/)\..*$/;

/**
 * Extract (guess) filename from a hashed filename
 */
export const getAssetName = (assetFilepath) => {
  if (!assetFilepath) {
    return '';
  }

  let result;

  for (let i = 0; i < PATTERNS.length && !result; i += 1) {
    const pattern = PATTERNS[i];
    const extracted = assetFilepath.replace(pattern, '$1$2');

    if (extracted && extracted !== assetFilepath && !NO_BASENAME.test(extracted)) {
      result = extracted;
    }
  }

  if (!result) {
    return assetFilepath;
  }

  return result;
};

// css ./node_modules/css-loader/dist/cjs.js??ref--6-0!./src/assets/styles/default.styl
const NAME_WITH_LOADERS = /!/;

// ./src/index.jsx + 27 modules
const NAME_WITH_MODULES = /\s\+\s\d*\smodules$/;

// css ../node_modules../node_modules/package-a
const INVALID_CSS_PREFIX = /^css\s.*node_modules(?!\/)/;

export const getModuleName = (name) => {
  if (!name) {
    return '';
  }

  if (NAME_WITH_LOADERS.test(name)) {
    const normalizedName = last(name.split(NAME_WITH_LOADERS));

    if (normalizedName?.trim()) {
      return normalizedName;
    }
  }

  if (NAME_WITH_MODULES.test(name)) {
    return name.replace(NAME_WITH_MODULES, '');
  }

  if (INVALID_CSS_PREFIX.test(name)) {
    return name.replace(INVALID_CSS_PREFIX, '');
  }

  return name;
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

/**
 * Get public package name from package id
 *
 * @param {String} packageId
 * @return {String} public package name
 */
export const getPackagePublicName = (packageId) => {
  // Split packages
  const name = last(packageId.split(PACKAGES_SEPARATOR));

  // Strip package suffix (eg: ~1)
  return name.split(PACKAGE_ID_SEPARATOR)[0];
};

/**
 * @param {String|Number} chunkId
 * @return {String}
 */
export const normalizeChunkId = (chunkId) => chunkId.toString();
