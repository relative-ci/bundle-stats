import round from 'lodash/round';

import { PACKAGES_SEPARATOR, PACKAGE_ID_SEPARATOR } from '../config';
import { createGetMetricType } from '../utils/metrics';
import { metrics } from './metrics';

// Hex patterns
const HEX_HASH_PATTERN = '[a-f0-9]{5,32}';
const HEX_HASH_SEPARATOR_PATTERN = '[-_.~]';

// Base64URL patterns
const BASE64URL_HASH_PATTERN = '[A-Za-z0-9_-]{4,}';
const BASE64URL_SEPARATOR_PATTERN = '[.~]';

// Match multiple extensions: .js, .js.gz, .min.js, .chunk.js
const EXTENSION_PATTERN = /(?:\.[a-z0-9]{2,}){1,}/;

const PATTERNS = [
  // Match path/name-HEXHASH.EXT,
  //       path/name.HEXHASH.EXT,
  //       path/name_HEXHASH.EXT,
  //       path/name-HEXHASH.chunk.EXT
  {
    pattern: new RegExp(
      `(.*)${HEX_HASH_SEPARATOR_PATTERN}${HEX_HASH_PATTERN}(${EXTENSION_PATTERN.source})$`,
    ),
    replace: '$1$2',
  },

  // Match path/name-BASE64URLHASH.EXT,
  //       path/name.BASE64URLHASH.EXT,
  //       path/name_BASE64URLHASH.EXT,
  //       path/name-BASE64URLHASH.chunk.EXT
  {
    pattern: new RegExp(
      `(.*)${BASE64URL_SEPARATOR_PATTERN}${BASE64URL_HASH_PATTERN}(${EXTENSION_PATTERN.source})$`,
    ),
    replace: '$1$2',
  },

  // Match static/HEXHASH.ext
  {
    pattern: new RegExp(`(static)/${HEX_HASH_PATTERN}(.*${EXTENSION_PATTERN.source})$`),
    replace: '$1$2',
  },

  // Match static/HEXHASH/_name.ext
  {
    pattern: new RegExp(`(static)/${BASE64URL_HASH_PATTERN}/(_.*${EXTENSION_PATTERN.source})$`),
    replace: '$1/[hash]/$2',
  },
];

const NO_BASENAME = /(^|.*\/)\..*$/;

/**
 * Extract (guess) filename from a hashed filename
 */
export const getAssetName = (statsAssetPath?: string | null): string => {
  if (!statsAssetPath) {
    return '';
  }

  for (let i = 0; i < PATTERNS.length; i += 1) {
    const { pattern, replace } = PATTERNS[i];

    const extracted: string = statsAssetPath.replace(pattern, replace);

    if (extracted && extracted !== statsAssetPath && !NO_BASENAME.test(extracted)) {
      return extracted;
    }
  }

  return statsAssetPath;
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
