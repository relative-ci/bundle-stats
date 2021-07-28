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

// Extract npm package names from a module path
export const MODULE_PATH_PACKAGES = /(node_modules|~)\/((!?@(([\w|\-|_|.]*)\/){2})|(([\w|\-|_|.]*)\/))/g;
