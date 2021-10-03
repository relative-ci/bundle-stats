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

// Extract package paths from module path
// https://regex101.com/r/22Leep/5
export const MODULE_PATH_PACKAGES =
  /((?:node_modules|~)(?:\/\.pnpm)?\/)((?:@[\w|\-|_|.]*[/|+])?(?:[\w|\-|_|.]+\+)*(?:[\w|\-|_|.]*(?:@[\w|\-|_|.]*)?)(?:_(?:@[\w|\-|_|.]*[/|+])?(?:[\w|\-|_|.]*(?:@[\w|\-|_|.]*)?))*\/)/g

// Extract package name from package path
// https://regex101.com/r/tTlU0W/5
export const PACKAGE_PATH_NAME =
  /(?:(?:node_modules|~)(?:\/\.pnpm)?)\/(?:((?:@[\w|\-|_|.]*[/|+])?(?:(?:[\w|\-|_|.]+\+)*)(?:[\w|\-|_|.]+))(?:@[\w|\-|_|.]+)?)(?:_(?:(?:((?:@[\w|\-|_|.]+[/|+])?(?:[\w|\-|_|.]+))(?:@[\w|\-|_|.]*))))*\//g;
