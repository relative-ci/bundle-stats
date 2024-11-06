import {
  BooleanParam,
  JsonParam,
  ObjectParam,
  QueryParamConfig,
  StringParam,
  decodeQueryParams,
  encodeQueryParams,
} from 'serialize-query-params';
import isEmpty from 'lodash/isEmpty';

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
  MODULE_SOURCE_TYPE_LABELS,
  PACKAGE_FILTERS,
  SECTIONS,
} from '../config/component-links';
import I18N from '../i18n';

export type ComponentLinkFilters = Record<string, boolean | string>;

export interface ComponentLinkParams {
  search?: string;
  entryId?: string;
  metric?: string;
  filters?: ComponentLinkFilters;
  sortBy?: string;
  direction?: string;
}

export interface ComponentLink {
  title: string;
  section: string;
  params?: {
    [key: string]: ComponentLinkParams;
  };
}

export const getAssetFileTypeFilters = (value = true): ComponentLinkFilters => {
  const filters = {} as ComponentLinkFilters;

  FILE_TYPES.forEach((fileTypeFilter) => {
    filters[`${ASSET_FILE_TYPE}.${fileTypeFilter}`] = value;
  });

  return filters;
};

export const getAssetEntryTypeFilters = (value = true): ComponentLinkFilters => {
  const filters = {} as ComponentLinkFilters;

  [ASSET_FILTERS.ENTRY, ASSET_FILTERS.INITIAL, ASSET_FILTERS.CHUNK, ASSET_FILTERS.OTHER].forEach(
    (entryTypeFilter) => {
      filters[`${ASSET_ENTRY_TYPE}.${entryTypeFilter}`] = value;
    },
  );

  return filters;
};

export const getModuleSourceTypeFilters = (value = true): ComponentLinkFilters => ({
  [`${MODULE_SOURCE_TYPE}.${MODULE_FILTERS.FIRST_PARTY}`]: value,
  [`${MODULE_SOURCE_TYPE}.${MODULE_FILTERS.THIRD_PARTY}`]: value,
});

export const getModuleChunkFilters = (
  chunkIds: Array<string>,
  value: boolean,
): ComponentLinkFilters => {
  const filters = {} as ComponentLinkFilters;

  chunkIds.forEach((chunkId) => {
    filters[`${MODULE_CHUNK}.${chunkId}`] = value;
  });

  return filters;
};

export const getModuleFileTypeFilters = (value = true): ComponentLinkFilters => {
  const filters = {} as ComponentLinkFilters;

  MODULE_SOURCE_FILE_TYPES.forEach((fileType) => {
    filters[`${MODULE_FILE_TYPE}.${fileType}`] = value;
  });

  return filters;
};

export const TOTALS: ComponentLink = {
  section: SECTIONS.TOTALS,
  title: I18N.COMPONENT_LINK_TOTALS,
};

export const BUNDLE_ASSETS_INITIAL_JS: ComponentLink = {
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

export const BUNDLE_ASSETS_INITIAL_CSS: ComponentLink = {
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

export const BUNDLE_ASSETS_CACHE_INVALIDATION: ComponentLink = {
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

export const BUNDLE_ASSETS_COUNT: ComponentLink = {
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

export const BUNDLE_ASSETS_CHUNK_COUNT: ComponentLink = {
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

export const getBundleAsset = (entryId: string): ComponentLink => ({
  section: SECTIONS.ASSETS,
  title: I18N.COMPONENT_LINK_BUNDLE_ASSET_DETAILS,
  params: {
    [COMPONENT.BUNDLE_ASSETS]: {
      entryId,
      filters: {},
    },
  },
});

export const getBundleAssetsByEntryType = (
  assetType: 'entry' | 'initial' | 'chunk',
): ComponentLink => ({
  section: SECTIONS.ASSETS,
  title: I18N.COMPONENT_LINK_BUNDLE_ASSETS_BY_ENTRY_TYPE(assetType),
  params: {
    [COMPONENT.BUNDLE_ASSETS]: {
      filters: {
        [ASSET_FILTERS.CHANGED]: false,
        ...getAssetEntryTypeFilters(false),
        [`${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.ENTRY}`]: assetType === 'entry',
        [`${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.INITIAL}`]: assetType === 'initial',
        [`${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.CHUNK}`]: assetType === 'chunk',
      },
    },
  },
});

export const getBundleAssetsFileTypeComponentLink = (
  fileType: string,
  label: string = fileType,
): ComponentLink => ({
  section: SECTIONS.ASSETS,
  title: I18N.COMPONENT_LINK_BUNDLE_ASSETS_BY_FILE_TYPE({ label }),
  params: {
    [COMPONENT.BUNDLE_ASSETS]: {
      filters: {
        ...getAssetFileTypeFilters(false),
        [`${ASSET_FILE_TYPE}.${fileType}`]: true,
      },
    },
  },
});

export const BUNDLE_MODULES: ComponentLink = {
  section: SECTIONS.MODULES,
  title: I18N.COMPONENT_LINK_MODULES,
  params: {
    [COMPONENT.BUNDLE_MODULES]: {
      filters: {
        // Keep a filter to allow the merge and skip default
        [MODULE_FILTERS.CHANGED]: false,
      },
      [MODULE_FILTERS.METRIC]: 'totalSize',
    },
  },
};

export const BUNDLE_MODULES_DUPLICATE: ComponentLink = {
  section: SECTIONS.MODULES,
  title: I18N.COMPONENT_LINK_MODULES_DUPLICATE,
  params: {
    [COMPONENT.BUNDLE_MODULES]: {
      filters: {
        [MODULE_FILTERS.CHANGED]: false,
        [MODULE_FILTERS.DUPLICATED]: true,
      },
      [MODULE_FILTERS.METRIC]: 'duplicateSize',
    },
  },
};

export const getBundleModulesBySearch = (search: string): ComponentLink => ({
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

export const getBundleModulesByChunk = (
  chunkIds: Array<string>,
  chunkId: string,
  fileType = '',
): ComponentLink => ({
  section: SECTIONS.MODULES,
  title: I18N.COMPONENT_LINK_CHUNK_MODULES,
  params: {
    [COMPONENT.BUNDLE_MODULES]: {
      filters: {
        [MODULE_FILTERS.CHANGED]: false,
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

export const getBundleModulesByFileTpe = (
  fileType: string,
  fileTypeLabel?: string,
): ComponentLink => ({
  section: SECTIONS.MODULES,
  title: I18N.COMPONENT_LINK_MODULES_BY_FILE_TYPE(fileTypeLabel || fileType),
  params: {
    [COMPONENT.BUNDLE_MODULES]: {
      filters: {
        ...getModuleFileTypeFilters(false),
        [`${MODULE_FILE_TYPE}.${fileType}`]: true,
      },
    },
  },
});

export const getBundleModulesBySource = (thirdParty: boolean, label = ''): ComponentLink => ({
  section: SECTIONS.MODULES,
  title: I18N.COMPONENT_LINK_MODULES_BY_SOURCE(label),
  params: {
    [COMPONENT.BUNDLE_MODULES]: {
      filters: {
        [`${MODULE_SOURCE_TYPE}.${MODULE_FILTERS.THIRD_PARTY}`]: thirdParty,
        [`${MODULE_SOURCE_TYPE}.${MODULE_FILTERS.FIRST_PARTY}`]: !thirdParty,
      },
    },
  },
});

export const BUNDLE_PACKAGES_COUNT: ComponentLink = {
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

export const BUNDLE_PACKAGES_CHANGED: ComponentLink = {
  section: SECTIONS.PACKAGES,
  title: I18N.COMPONENT_LINK_PACKAGES_CHANGED,
  params: {
    [COMPONENT.BUNDLE_PACKAGES]: {
      filters: {
        // Keep a filter to allow the merge and skip default
        [PACKAGE_FILTERS.CHANGED]: true,
      },
    },
  },
};

export const BUNDLE_PACKAGES_DUPLICATE: ComponentLink = {
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

export const BUNDLE_PACKAGES_DUPLICATE_CHANGED: ComponentLink = {
  section: SECTIONS.PACKAGES,
  title: I18N.COMPONENT_LINK_PACKAGES_DUPLICATE_CHANGED,
  params: {
    [COMPONENT.BUNDLE_PACKAGES]: {
      filters: {
        [PACKAGE_FILTERS.CHANGED]: true,
        [PACKAGE_FILTERS.DUPLICATE]: true,
      },
    },
  },
};

export const getBundlePackagesByNameComponentLink = (search: string): ComponentLink => ({
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

/**
 * Custom URI ecoding/decoding that encodes the params used by ObjectParam as separators: `_`, `-`
 */
const CUSTOM_ENCODING_URI_CHARS_PATTERN = /(_|-)/g;
const CUSTOM_ENCODING_URI_CODE_PATTERN = /(%(?:2D|5F))/g;

function customEncodeURIComponent(value: string): string {
  return encodeURIComponent(value).replace(
    CUSTOM_ENCODING_URI_CHARS_PATTERN,
    (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}

function customDecodeURIComponent(value: string): string {
  const encodedURI = value.replace(CUSTOM_ENCODING_URI_CODE_PATTERN, (code) =>
    String.fromCharCode(parseInt(code.replace(/^%/, ''), 16)),
  );

  return decodeURIComponent(encodedURI);
}

/**
 * Custom section params encoder/decoder
 *
 * @NOTE To keep the length of the query string small when using a lot of filters (ex: chunks)
 * we use different encoding/decoding algorithms depending on the property type:
 *
 * - section: JsonParam
 *   - search: StringParam
 *   - entryId: StringParam
 *   - metric: StringParam
 *   - sortBy: StringParam
 *   - direction: StringParam
 *   - filters: ObjectParam
 *      - value: BooleanParam
 */
export const ComponentStateParam: QueryParamConfig<any, any> = {
  encode: (sectionState) => {
    if (!sectionState) {
      return undefined;
    }

    const search = StringParam.encode(sectionState.search);
    const entryId = StringParam.encode(sectionState.entryId);
    const metric = StringParam.encode(sectionState.metric);
    const sortBy = StringParam.encode(sectionState.sortBy);
    const direction = StringParam.encode(sectionState.direction);

    const filtersEncodedValues: Record<string, string> = {};
    Object.entries(sectionState.filters || {}).forEach(([key, val]) => {
      filtersEncodedValues[customEncodeURIComponent(key)] = BooleanParam.encode(!!val) as string;
    });
    const filters = ObjectParam.encode(filtersEncodedValues);

    const data = {} as any;

    if (search) {
      data.search = search;
    }

    if (entryId) {
      data.entryId = entryId;
    }

    if (metric) {
      data.metric = metric;
    }

    if (sortBy) {
      data.sortBy = sortBy;
    }

    if (direction) {
      data.direction = direction;
    }

    if (!isEmpty(filters)) {
      data.filters = filters;
    }

    return JsonParam.encode(data);
  },
  decode: (queryString) => {
    const params = JsonParam.decode(queryString);

    if (isEmpty(params)) {
      return undefined;
    }

    const search = StringParam.decode(params.search);
    const entryId = StringParam.decode(params.entryId);
    const metric = StringParam.decode(params.metric);
    const sortBy = StringParam.decode(params.sortBy);
    const direction = StringParam.decode(params.direction);

    let filters: Record<string, boolean> = {};

    // Decode filters if typeof is string (mixed encoding)
    // .1 ObjectParam
    // .2 BooleanParam
    if (typeof params.filters === 'string') {
      const decodedFilters = ObjectParam.decode(params.filters);

      Object.entries(decodedFilters || {}).forEach(([key, value]) => {
        const filterDecodedValue = BooleanParam.decode(value);

        if (typeof filterDecodedValue !== 'undefined' && filterDecodedValue !== null) {
          filters[customDecodeURIComponent(key)] = filterDecodedValue;
        }
      });
    } else if (typeof params.filters === 'object') {
      // Use directly if already decoded (JSON encoding - obsolete)
      filters = params.filters;
    }

    // Include only the truthy values
    const result: Record<string, any> = {};

    if (search) {
      result.search = search;
    }

    if (entryId) {
      result.entryId = entryId;
    }

    if (metric) {
      result.metric = metric;
    }

    if (sortBy) {
      result.sortBy = sortBy;
    }

    if (direction) {
      result.direction = direction;
    }

    if (!isEmpty(filters)) {
      result.filters = filters;
    }

    if (isEmpty(result)) {
      return undefined;
    }

    return result;
  },
};

export const COMPONENT_STATE_META = {
  [COMPONENT.BUNDLE_ASSETS]: ComponentStateParam,
  [COMPONENT.BUNDLE_MODULES]: ComponentStateParam,
  [COMPONENT.BUNDLE_PACKAGES]: ComponentStateParam,
} as const;

type ComponentStateQueryStringParams = Record<string, ComponentLinkParams>;

export const getComponentStateQueryString = (params: ComponentStateQueryStringParams = {}) => {
  const data = encodeQueryParams(COMPONENT_STATE_META, params);
  const searchParams = new URLSearchParams(data as Record<string, string>);
  return searchParams.toString();
};

export const getComponentStateData = (queryString: string): ComponentStateQueryStringParams => {
  const params = new URLSearchParams(queryString);
  return decodeQueryParams(COMPONENT_STATE_META, Object.fromEntries(params.entries()));
};

export const METRIC_COMPONENT_LINKS = new Map([
  ['webpack.totalSizeByTypeALL', { link: TOTALS }],
  ['webpack.totalInitialSizeJS', { link: BUNDLE_ASSETS_INITIAL_JS }],
  ['webpack.totalInitialSizeCSS', { link: BUNDLE_ASSETS_INITIAL_CSS }],
  ['webpack.cacheInvalidation', { link: BUNDLE_ASSETS_CACHE_INVALIDATION }],
  ['webpack.assetCount', { link: BUNDLE_ASSETS_COUNT }],
  ['webpack.chunkCount', { link: BUNDLE_ASSETS_CHUNK_COUNT }],
  ['webpack.moduleCount', { link: BUNDLE_MODULES }],
  ['webpack.duplicateModulesCount', { link: BUNDLE_MODULES_DUPLICATE }],
  ['webpack.duplicateCode', { link: BUNDLE_MODULES_DUPLICATE }],
  ['webpack.packageCount', { link: BUNDLE_PACKAGES_COUNT }],
  ['webpack.duplicatePackagesCount', { link: BUNDLE_PACKAGES_DUPLICATE }],
]);
