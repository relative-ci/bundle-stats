export const ASSET_ENTRY_TYPE = 'et';
export const ASSET_FILE_TYPE = 'ft';
export const MODULE_CHUNK = 'c';
export const MODULE_FILE_TYPE = 'mft';
export const MODULE_SOURCE_TYPE = 'mst';

export const ASSET_FILTERS = {
  OTHER: 'asset',
  CHANGED: 'changed',
  ENTRY: 'entrypoint',
  INITIAL: 'initial',
  CHUNK: 'chunk',
};

export const MODULE_FILTERS = {
  CHANGED: 'changed',
  DUPLICATED: 'md',
  FIRST_PARTY: 'fp',
  THIRD_PARTY: 'tp',
  METRIC: 'metric',
};

export const PACKAGE_FILTERS = {
  CHANGED: 'changed',
  DUPLICATE: 'duplicate',
};

export const SECTIONS = {
  TOTALS: 'overview',
  ASSETS: 'assets',
  MODULES: 'modules',
  PACKAGES: 'packages',
};

export const COMPONENT = {
  BUNDLE_ASSETS: 'ba',
  BUNDLE_MODULES: 'bm',
  BUNDLE_PACKAGES: 'bp',
};

export const MODULE_SOURCE_TYPE_LABELS = {
  FIRST_PARTY: 'First party',
  THIRD_PARTY: 'Third party',
};
