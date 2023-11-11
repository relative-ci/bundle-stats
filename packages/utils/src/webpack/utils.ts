import round from 'lodash/round';

import { PACKAGES_SEPARATOR, PACKAGE_ID_SEPARATOR } from '../config';
import { createGetMetricType } from '../utils/metrics';
import { metrics } from './metrics';

// Match hex hash
const HASH_PATTERN = '[a-f0-9]{5,32}';

// Match hash separator
const HASH_SEPARATOR_PATTERN = '[-.]';

// Match multiple extensions: .js, .js.gz, .min.js, .chunk.js
const EXTENSION_PATTERN = /(?:\.[a-z0-9]{2,}){1,}/;

const PATTERNS = [
  // Match path/name-HASH.ext, path/name.HASH.ext, path/name-HASH.chunk.ext
  `(.*)${HASH_SEPARATOR_PATTERN}${HASH_PATTERN}(${EXTENSION_PATTERN.source})$`,

  // Match static/HASH.ext
  `(static)/${HASH_PATTERN}(.*${EXTENSION_PATTERN.source})$`,
].map((pattern) => new RegExp(pattern));

const NO_BASENAME = /(^|.*\/)\..*$/;

/**
 * Extract (guess) filename from a hashed filename
 */
export const getAssetName = (assetFilepath?: string | null): string => {
  if (!assetFilepath) {
    return '';
  }

  for (let i = 0; i < PATTERNS.length; i += 1) {
    const pattern = PATTERNS[i];
    const extracted: string = assetFilepath.replace(pattern, '$1$2');

    if (extracted && extracted !== assetFilepath && !NO_BASENAME.test(extracted)) {
      return extracted;
    }
  }

  return assetFilepath;
};

// css ./node_modules/css-loader/dist/cjs.js??ref--6-0!./src/assets/styles/default.styl
const NAME_WITH_LOADERS = /!/;

// ./src/index.jsx + 27 modules
const NAME_WITH_MODULES = /\s?\+\s?\d*\s?modules$/;

// css ../node_modules../node_modules/package-a
const INVALID_CSS_PREFIX = /^css\s.*node_modules(?!\/)/;

/**
 * Extract normalize module name
 */
export const getModuleName = (name?: string | null) => {
  if (!name) {
    return '';
  }

  if (NAME_WITH_LOADERS.test(name)) {
    const segments = name.split(NAME_WITH_LOADERS);
    const normalizedName = segments[segments.length - 1];

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
export const calculateCacheInvalidation = (rows: Array<any>): number => {
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

export const getMetricAdded = (runs: Array<any>): boolean => {
  const [current, baseline] = runs?.map((run) => run?.value) || [];

  return Boolean(current !== null && !baseline);
};

export const getMetricDeleted = (runs: Array<any>) => {
  const [current, baseline] = runs?.map((run) => run?.value) || [];

  return Boolean(baseline !== null && !current);
};

/**
 * Get webpack metric data
 */
export const getMetricType = createGetMetricType(metrics);

/**
 * Get public package name from package id
 */
export const getPackagePublicName = (packageId: string): string => {
  // Split packages
  const packageNames = packageId.split(PACKAGES_SEPARATOR);
  const name = packageNames[packageNames.length - 1];

  // Strip package suffix (eg: ~1)
  return name.split(PACKAGE_ID_SEPARATOR)[0];
};

export const normalizeChunkId = (chunkId: string | number): string => chunkId.toString();
