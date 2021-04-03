export * from './component-links';
export * from './file-types';
export * from './insights';
export * from './metrics';
export * from './delta';

export const PACKAGES_SEPARATOR = ':';
export const PACKAGE_ID_SEPARATOR = '~';

export const SOURCE_PATH_WEBPACK_STATS = 'webpack';
export const SOURCE_PATH_LIGHTHOUSE = 'lighthouse';
export const SOURCE_PATH_BROWSERTIME = 'browsertime';
export const SOURCE_PATHS = [
  SOURCE_PATH_WEBPACK_STATS,
  SOURCE_PATH_LIGHTHOUSE,
  SOURCE_PATH_BROWSERTIME,
];
