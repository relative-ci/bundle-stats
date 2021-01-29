import { FILE_TYPES } from '@bundle-stats/utils';

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

export const SECTIONS = {
  TOTALS: 'TOTALS',
  ASSETS: 'ASSETS',
  MODULES: 'MODULES',
  PACKAGES: 'PACKAGES',
};

export const ASSET_FILTERS = {
  ASSET: 'asset',
  CHANGED: 'changed',
  ENTRY: 'entrypoint',
  INITIAL: 'initial',
  CHUNK: 'chunk',
};

export const PACKAGE_FILTERS = {
  CHANGED: 'changed',
  DUPLICATE: 'duplicate',
};

export const COMPONENT = {
  BUNDLE_ASSETS: 'ba',
  BUNDLE_PACKAGES: 'bp',
};

export const ASSETS_SIZES_FILE_TYPE_MAP = FILE_TYPES.reduce(
  (agg, fileType) => ({
    ...agg,
    [`webpack.sizes.totalSizeByType${fileType}`]: fileType,
  }),
  {},
);
