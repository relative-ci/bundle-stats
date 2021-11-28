import { FILE_TYPES, SECTIONS } from '@bundle-stats/utils';

export const NO_SPACE = 'no-space';
export const SPACE_XXXSMALL = 'xxxsmall';
export const SPACE_XXSMALL = 'xxsmall';
export const SPACE_XSMALL = 'xsmall';
export const SPACE_SMALL = 'small';
export const SPACE_MEDIUM = 'medium';
export const SPACE_LARGE = 'large';
export const SPACE_XLARGE = 'xlarge';
export const SPACE_XXLARGE = 'xxlarge';
export const SPACE_XXXLARGE = 'xxxlarge';

export const SPACES = [
  NO_SPACE,
  SPACE_XXXSMALL,
  SPACE_XXSMALL,
  SPACE_XSMALL,
  SPACE_SMALL,
  SPACE_MEDIUM,
  SPACE_LARGE,
  SPACE_XLARGE,
  SPACE_XXLARGE,
  SPACE_XXXLARGE,
];

export const URLS = {
  OVERVIEW: '/',
  ASSETS: '/assets',
  MODULES: '/modules',
  PACKAGES: '/packages',
};

export const SECTION_URLS = {
  [SECTIONS.TOTALS]: URLS.OVERVIEW,
  [SECTIONS.ASSETS]: URLS.ASSETS,
  [SECTIONS.MODULES]: URLS.MODULES,
  [SECTIONS.PACKAGES]: URLS.PACKAGES,
};

export const ASSETS_SIZES_FILE_TYPE_MAP = FILE_TYPES.reduce(
  (agg, fileType) => ({
    ...agg,
    [`webpack.sizes.totalSizeByType${fileType}`]: fileType,
  }),
  {},
);

export const METRICS_WEBPACK_GENERAL = [
  'totalSizeByTypeALL',
  'totalInitialSizeJS',
  'totalInitialSizeCSS',
  'cacheInvalidation',
];
export const METRICS_WEBPACK_ASSETS = ['assetCount', 'chunkCount'];
export const METRICS_WEBPACK_MODULES = ['moduleCount'];
export const METRICS_WEBPACK_PACKAGES = ['packageCount', 'duplicatePackagesCount'];
