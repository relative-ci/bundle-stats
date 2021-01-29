import { FILE_TYPE_CSS, FILE_TYPE_JS } from '@bundle-stats/utils/lib-esm/config/file-types';

import { ASSET_FILTERS, COMPONENT, PACKAGE_FILTERS, SECTIONS } from './constants';
import { getAssetEntryTypeFilters, getAssetFileTypeFilters } from './utils';

export const TOTALS = {
  section: SECTIONS.TOTALS,
};

export const BUNDLE_ASSETS_INITIAL_JS = {
  section: SECTIONS.ASSETS,
  params: {
    [COMPONENT.BUNDLE_ASSETS]: {
      filters: {
        [ASSET_FILTERS.CHANGED]: false,
        [`entryTypes.${ASSET_FILTERS.INITIAL}`]: true,
        [`fileTypes.${FILE_TYPE_JS}`]: true,
      },
    },
  },
};

export const BUNDLE_ASSETS_INITIAL_CSS = {
  section: SECTIONS.ASSETS,
  params: {
    [COMPONENT.BUNDLE_ASSETS]: {
      filters: {
        [ASSET_FILTERS.CHANGED]: false,
        [`entryTypes.${ASSET_FILTERS.INITIAL}`]: true,
        [`fileTypes.${FILE_TYPE_CSS}`]: true,
      },
    },
  },
};

export const BUNDLE_ASSETS_CACHE_INVALIDATION = {
  section: SECTIONS.ASSETS,
  params: {
    [COMPONENT.BUNDLE_ASSETS]: {
      filters: {
        [ASSET_FILTERS.CHANGED]: true,
        ...getAssetEntryTypeFilters(true),
        ...getAssetFileTypeFilters(true),
      },
    },
  },
};

export const BUNDLE_ASSETS_COUNT = {
  section: SECTIONS.ASSETS,
  params: {
    [COMPONENT.BUNDLE_ASSETS]: {
      filters: {
        [ASSET_FILTERS.CHANGED]: false,
        ...getAssetEntryTypeFilters(true),
        ...getAssetFileTypeFilters(true),
      },
    },
  },
};

export const BUNDLE_ASSETS_CHUNK_COUNT = {
  section: SECTIONS.ASSETS,
  params: {
    [COMPONENT.BUNDLE_ASSETS]: {
      filters: {
        [ASSET_FILTERS.CHANGED]: false,
        [`entryTypes.${ASSET_FILTERS.CHUNK}`]: true,
        ...getAssetFileTypeFilters(true),
      },
    },
  },
};

export const BUNDLE_MODULES = {
  section: SECTIONS.MODULES,
};

export const BUNLDE_PACKAGES_COUNT = {
  section: SECTIONS.PACKAGES,
  params: {
    [COMPONENT.BUNDLE_PACKAGES]: {
      filters: {
        [PACKAGE_FILTERS.CHANGED]: false,
      },
    },
  },
};

export const BUNDLE_PACKAGES_DUPLICATE = {
  section: SECTIONS.PACKAGES,
  params: {
    [COMPONENT.BUNDLE_PACKAGES]: {
      filters: {
        [PACKAGE_FILTERS.CHANGED]: false,
        [PACKAGE_FILTERS.DUPLICATE]: true,
      },
    },
  },
};
