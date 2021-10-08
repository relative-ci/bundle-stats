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
  'totalSizeByTypeALL',
  'totalInitialSizeJS',
  'totalInitialSizeCSS',
  'cacheInvalidation',
  'moduleCount',
  'chunkCount',
  'assetCount',
  'packageCount',
  'duplicatePackagesCount',
];

const NAME_SLUG = /[\w|\-|_|.]+/;
const VERSION = /@[\w|\-|_|.]+/;

// Extract package paths from module path
// https://regex101.com/r/22Leep/5
/* eslint-disable prettier/prettier */
export const MODULE_PATH_PACKAGES = new RegExp([
  // match dependency directory (eg: `node_modules/`, `node_modules/.pnpm/`)
  '(',
    '(?:node_modules|~)',
    '(?:/\\.pnpm)?',
    '/',
  ')',
  // match package name
  '(',
    // match `@organization/` or `@organization+`(pnpm)
    `(?:@${NAME_SLUG.source}[/|+])?`,
    // match github.com+organization+
    `(?:${NAME_SLUG.source}\\+)*`,
    // match package name
    `(?:${NAME_SLUG.source})`,
    // match version
    `(?:${VERSION.source})?`,
  ')',

  // Match pnpm peer dependencies (eg: package-a@version_package-b@version)
  '(?:_',
    `(?:@${NAME_SLUG.source}[/|+])?`,
    `(?:${NAME_SLUG.source})`,
    `(?:@${NAME_SLUG.source})?`,
  ')*',
  '/',
].join(''), 'g');
/* eslint-enable prettier/prettier */

// Extract package name from package path
// https://regex101.com/r/tTlU0W/5
/* eslint-disable prettier/prettier */
export const PACKAGE_PATH_NAME = new RegExp([
  '(?:',
    '(?:node_modules|~)',
    '(?:/\\.pnpm)?',
  ')',
  '/',
  // match dependency
  '(?:',
    '(',
      `(?:@${NAME_SLUG.source}[/|+])?`,
      `(?:(?:${NAME_SLUG.source}\\+)*)`,
      `(?:${NAME_SLUG.source})`,
    ')',
    `(?:${VERSION.source})?`,
  ')',
  // match peer dependency
  '(?:_',
    '(',
      `(?:@${NAME_SLUG.source}[/|+])?`,
      `(?:${NAME_SLUG.source})`,
    ')',
    `(?:@${NAME_SLUG.source})`,
  ')*',
  '/',
].join(''), 'g');
/* eslint-enable prettier/prettier */
