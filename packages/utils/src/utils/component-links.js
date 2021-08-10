import template from 'lodash/template';
import { stringify } from 'query-string';
import { JsonParam, encodeQueryParams } from 'serialize-query-params';

import {
  FILE_TYPES,
  FILE_TYPE_CSS,
  FILE_TYPE_JS,
  MODULE_SOURCE_FILE_TYPES,
} from '../config/file-types';
import {
  ASSET_ENTRY_TYPE,
  ASSET_FILE_TYPE,
  ASSET_FILTERS,
  COMPONENT,
  MODULE_CHUNK,
  MODULE_FILE_TYPE,
  MODULE_FILTERS,
  MODULE_SOURCE_TYPE,
  PACKAGE_FILTERS,
  SECTIONS,
} from '../config/component-links';
import I18N from '../i18n';

export const getAssetFileTypeFilters = (value = true) =>
  FILE_TYPES.reduce(
    (agg, fileTypeFilter) => ({
      ...agg,
      [`${ASSET_FILE_TYPE}.${fileTypeFilter}`]: value,
    }),
    {},
  );

export const getAssetEntryTypeFilters = (value = true) =>
  [ASSET_FILTERS.ENTRY, ASSET_FILTERS.INITIAL, ASSET_FILTERS.CHUNK, ASSET_FILTERS.ASSET].reduce(
    (agg, entryTypeFilter) => ({
      ...agg,
      [`${ASSET_ENTRY_TYPE}.${entryTypeFilter}`]: value,
    }),
    {},
  );

export const getModuleSourceTypeFilters = (value = true) => ({
  [`${MODULE_SOURCE_TYPE}.${MODULE_FILTERS.FIRST_PARTY}`]: value,
  [`${MODULE_SOURCE_TYPE}.${MODULE_FILTERS.THIRD_PARTY}`]: value,
});

export const getModuleChunkFilters = (chunkIds, value) => chunkIds.reduce(
  (agg, chunkId) => ({
    ...agg,
    [`${MODULE_CHUNK}.${chunkId}`]: value,
  }),
  {},
);

export const getModuleFileTypeFilters = (value = true) =>
  MODULE_SOURCE_FILE_TYPES.reduce(
    (agg, fileType) => ({
      ...agg,
      [`${MODULE_FILE_TYPE}.${fileType}`]: value,
    }),
    {},
  );

export const TOTALS = {
  section: SECTIONS.TOTALS,
  title: I18N.COMPONENT_LINK_TOTALS,
};

export const BUNDLE_ASSETS_INITIAL_JS = {
  section: SECTIONS.ASSETS,
  title: I18N.COMPONENT_LINK_BUNDLE_ASSETS_INITIAL_JS,
  params: {
    [COMPONENT.BUNDLE_ASSETS]: {
      filters: {
        ...getAssetEntryTypeFilters(false),
        [`${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.INITIAL}`]: true,
        ...getAssetFileTypeFilters(false),
        [`${ASSET_FILE_TYPE}.${FILE_TYPE_JS}`]: true,
      },
    },
  },
};

export const BUNDLE_ASSETS_INITIAL_CSS = {
  section: SECTIONS.ASSETS,
  title: I18N.COMPONENT_LINK_BUNDLE_ASSETS_INITIAL_CSS,
  params: {
    [COMPONENT.BUNDLE_ASSETS]: {
      filters: {
        ...getAssetEntryTypeFilters(false),
        [`${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.INITIAL}`]: true,
        ...getAssetFileTypeFilters(false),
        [`${ASSET_FILE_TYPE}.${FILE_TYPE_CSS}`]: true,
      },
    },
  },
};

export const BUNDLE_ASSETS_CACHE_INVALIDATION = {
  section: SECTIONS.ASSETS,
  title: I18N.COMPONENT_LINK_BUNDLE_ASSETS_CACHE_INVALIDATION,
  params: {
    [COMPONENT.BUNDLE_ASSETS]: {
      filters: {
        [ASSET_FILTERS.CHANGED]: true,
      },
    },
  },
};

export const BUNDLE_ASSETS_COUNT = {
  section: SECTIONS.ASSETS,
  title: I18N.COMPONENT_LINK_BUNDLE_ASSETS_COUNT,
  params: {
    [COMPONENT.BUNDLE_ASSETS]: {
      filters: {
        // Keep a filter to allow the merge and skip default
        [ASSET_FILTERS.CHANGED]: false,
      },
    },
  },
};

export const BUNDLE_ASSETS_CHUNK_COUNT = {
  section: SECTIONS.ASSETS,
  title: I18N.COMPONENT_LINK_BUNDLE_ASSETS_CHUNK_COUNT,
  params: {
    [COMPONENT.BUNDLE_ASSETS]: {
      filters: {
        ...getAssetEntryTypeFilters(false),
        [`${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.CHUNK}`]: true,
      },
    },
  },
};

export const BUNDLE_MODULES = {
  section: SECTIONS.MODULES,
  title: I18N.COMPONENT_LINK_MODULES,
  params: {
    [COMPONENT.BUNDLE_MODULES]: {
      filters: {
        // Keep a filter to allow the merge and skip default
        [MODULE_FILTERS.CHANGED]: false,
      },
    },
  },
};

export const getBundleModulesBySearch = (search) => ({
  section: SECTIONS.MODULES,
  title: I18N.COMPONENT_LINK_MODULES,
  params: {
    [COMPONENT.BUNDLE_MODULES]: {
      search,
      filters: {
        // Keep a filter to allow the merge and skip default
        [MODULE_FILTERS.CHANGED]: false,
      },
    },
  },
});

export const getBundleModulesByChunk = (chunkIds, chunkId, fileType = '') => ({
  section: SECTIONS.MODULES,
  title: I18N.COMPONENT_LINK_CHUNK_MODULES,
  params: {
    [COMPONENT.BUNDLE_MODULES]: {
      filters: {
        [MODULE_FILTERS.CHANGED]: true,
        ...getModuleChunkFilters(chunkIds, false),
        [`${MODULE_CHUNK}.${chunkId}`]: true,
        ...(fileType && {
          ...getModuleFileTypeFilters(false),
          [`${MODULE_FILE_TYPE}.${fileType}`]: true,
        }),
      },
    },
  },
});

export const BUNLDE_PACKAGES_COUNT = {
  section: SECTIONS.PACKAGES,
  title: I18N.COMPONENT_LINK_PACKAGES_COUNT,
  params: {
    [COMPONENT.BUNDLE_PACKAGES]: {
      filters: {
        // Keep a filter to allow the merge and skip default
        [PACKAGE_FILTERS.CHANGED]: false,
      },
    },
  },
};

export const BUNDLE_PACKAGES_DUPLICATE = {
  section: SECTIONS.PACKAGES,
  title: I18N.COMPONENT_LINK_PACKAGES_DUPLICATE,
  params: {
    [COMPONENT.BUNDLE_PACKAGES]: {
      filters: {
        [PACKAGE_FILTERS.DUPLICATE]: true,
      },
    },
  },
};

export const getBundleAssetsFileTypeComponentLink = (fileType, label) => ({
  section: SECTIONS.ASSETS,
  title: template(I18N.COMPONENT_LINK_BUNDLE_ASSETS_BY_FILE_TYPE)({ label }),
  params: {
    [COMPONENT.BUNDLE_ASSETS]: {
      filters: {
        ...getAssetFileTypeFilters(false),
        [`${ASSET_FILE_TYPE}.${fileType}`]: true,
      },
    },
  },
});

export const getBundlePackagesByNameComponentLink = (search) => ({
  section: SECTIONS.PACKAGES,
  title: I18N.COMPONENT_LINK_VIEW_PACKAGE,
  params: {
    [COMPONENT.BUNDLE_PACKAGES]: {
      search,
      filters: {
        [PACKAGE_FILTERS.DUPLICATE]: true,
      },
    },
  },
});

export const getComponentStateQueryString = (params = {}) => {
  const meta = Object.keys(params).reduce(
    (agg, componentName) => ({
      ...agg,
      [componentName]: JsonParam,
    }),
    {},
  );

  return stringify(encodeQueryParams(meta, params));
};

export const METRIC_COMPONENT_LINKS = new Map([
  ['webpack.totalSizeByTypeALL', { link: TOTALS }],
  ['webpack.totalInitialSizeJS', { link: BUNDLE_ASSETS_INITIAL_JS }],
  ['webpack.totalInitialSizeCSS', { link: BUNDLE_ASSETS_INITIAL_CSS }],
  [
    'webpack.cacheInvalidation',
    {
      link: BUNDLE_ASSETS_CACHE_INVALIDATION,
      showDelta: false,
    },
  ],
  ['webpack.assetCount', { link: BUNDLE_ASSETS_COUNT }],
  ['webpack.chunkCount', { link: BUNDLE_ASSETS_CHUNK_COUNT }],
  ['webpack.moduleCount', { link: BUNDLE_MODULES }],
  ['webpack.packageCount', { link: BUNLDE_PACKAGES_COUNT }],
  ['webpack.duplicatePackagesCount', { link: BUNDLE_PACKAGES_DUPLICATE }],
]);
