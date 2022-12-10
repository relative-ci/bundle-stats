import { Metric } from './types';

export const SECTION_WEBPACK_STATS = 'stats';
export const SECTION_WEBPACK_SIZES = 'sizes';
export const SECTION_WEBPACK_ASSETS = 'assets';
export const SECTION_WEBPACK_MODULES = 'modules';
export const SECTION_WEBPACK_PACKAGES = 'packages';

export const SECTIONS = [
  SECTION_WEBPACK_STATS,
  SECTION_WEBPACK_SIZES,
  SECTION_WEBPACK_ASSETS,
  SECTION_WEBPACK_MODULES,
  SECTION_WEBPACK_PACKAGES,
];

export const SUMMARY_METRIC_PATHS = [
  Metric.BUNDLE_SIZE,
  Metric.INITIAL_SIZE_JS,
  Metric.INITIAL_SIZE_CSS,
  Metric.CACHE_INVALIDATION,
  Metric.MODULE_COUNT,
  Metric.DUPLICATE_MODULES_COUNT,
  Metric.DUPLICATE_CODE,
  Metric.CHUNK_COUNT,
  Metric.ASSET_COUNT,
  Metric.PACKAGE_COUNT,
  Metric.DUPLICATE_PACKAGES_COUNT,
];

const PACKAGE_PREFIX = /(?:node_modules|~)(?:\/\.pnpm)?/;
const PACKAGE_SLUG = /[a-zA-Z0-9]+(?:[-|_|.]+[a-zA-Z0-9]+)*/;
const VERSION = /@[\w|\-|_|.]+/;

// Extract package paths from module path
// https://regex101.com/r/22Leep/6
/* eslint-disable prettier/prettier */
export const MODULE_PATH_PACKAGES = new RegExp(
  [
    // match dependency directory (eg: `node_modules/`, `node_modules/.pnpm/`)
    `(?:${PACKAGE_PREFIX.source}/)`,
    // match package name
    '(?:',
    // match `@organization/` or `@organization+`(pnpm)
    `(?:@${PACKAGE_SLUG.source}[/|+])?`,
    // match github.com+organization+
    `(?:${PACKAGE_SLUG.source}\\+)*`,
    // match package name
    `(?:${PACKAGE_SLUG.source})`,
    // match version
    `(?:${VERSION.source})?`,
    ')',

    // Match pnpm peer dependencies (eg: package-a@version_package-b@version)
    '(?:_',
    `(?:@${PACKAGE_SLUG.source}[/|+])?`,
    `(?:${PACKAGE_SLUG.source})`,
    `(?:@${PACKAGE_SLUG.source})?`,
    ')*',
    '/',
  ].join(''),
  'g',
);
/* eslint-enable prettier/prettier */

// Extract package name from package path
// https://regex101.com/r/tTlU0W/6
/* eslint-disable prettier/prettier */
export const PACKAGE_PATH_NAME = new RegExp(
  [
    `(?:${PACKAGE_PREFIX.source}/)`,
    // match dependency
    '(?:',
    '(',
    `(?:@${PACKAGE_SLUG.source}[/|+])?`,
    `(?:(?:${PACKAGE_SLUG.source}\\+)*)`,
    `(?:${PACKAGE_SLUG.source})`,
    ')',
    `(?:${VERSION.source})?`,
    ')',
    // match peer dependency
    '(?:_',
    '(',
    `(?:@${PACKAGE_SLUG.source}[/|+])?`,
    `(?:${PACKAGE_SLUG.source})`,
    ')',
    `(?:@${PACKAGE_SLUG.source})`,
    ')*',
    '/',
  ].join(''),
  'g',
);
/* eslint-enable prettier/prettier */
