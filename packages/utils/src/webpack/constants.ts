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

export enum MetricId {
  BundleSize = 'totalSizeByTypeALL',
  TotalInitialSizeJS = 'totalInitialSizeJS',
  TotalInitialSizeCSS = 'totalInitialSizeCSS',
  CacheInvalidation = 'cacheInvalidation',
  ModuleName = 'moduleCount',
  ChunkCount = 'chunkCount',
  AssetCount = 'assetCount',
  PackageCount = 'packageCount',
  DuplicatePackagesCount = 'duplicatePackagesCount',
}

export const SIZE_BY_TYPE_METRIC_ID_ALL = 'ALL';
export const SIZE_BY_TYPE_METRIC_ID_PREFIX = 'totalSizeByType';

export enum SizeByTypeMetricId {
  JS = 'totalSizeByTypeJS',
  CSS = 'totalSizeByTypeCSS',
  IMG = 'totalSizeByTypeIMG',
  Media = 'totalSizeByTypeMEDIA',
  Font = 'totalSizeByTypeFONT',
  HTML = 'totalSizeByTypeHTML',
  Other = 'totalSizeByTypeOTHER',
}

export const SUMMARY_METRIC_PATHS = Object.values(MetricId);

const PACKAGE_PREFIX = /(?:node_modules|~)(?:\/\.pnpm)?/;
const PACKAGE_SLUG = /[a-zA-Z0-9]+(?:[-|_|.]+[a-zA-Z0-9]+)*/;
const VERSION = /@[\w|\-|_|.]+/;

// Extract package paths from module path
// https://regex101.com/r/22Leep/6
/* eslint-disable prettier/prettier, @typescript-eslint/indent */
export const MODULE_PATH_PACKAGES = new RegExp([
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
].join(''), 'g');

// Extract package name from package path
// https://regex101.com/r/tTlU0W/6
export const PACKAGE_PATH_NAME = new RegExp([
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
].join(''), 'g');
/* eslint-enable prettier/prettier, @typescript-eslint/indent */
