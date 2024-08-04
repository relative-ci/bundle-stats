import { FILE_TYPES, SECTIONS } from '@bundle-stats/utils';

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
  'webpack.totalSizeByTypeALL',
  'webpack.totalInitialSizeJS',
  'webpack.totalInitialSizeCSS',
  'webpack.cacheInvalidation',
];
export const METRICS_WEBPACK_ASSETS = ['webpack.assetCount', 'webpack.chunkCount'];
export const METRICS_WEBPACK_MODULES = [
  'webpack.moduleCount',
  'webpack.duplicateModulesCount',
  'webpack.duplicateCode',
];
export const METRICS_WEBPACK_PACKAGES = ['webpack.packageCount', 'webpack.duplicatePackagesCount'];

export const SORT = {
  ASC: 'asc',
  DESC: 'desc',
} as const;

export enum MetricsDisplayType {
  TABLE = 'table',
  TREEMAP = 'treemap',
}
