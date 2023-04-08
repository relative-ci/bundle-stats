import { MetricRun } from '../constants';

export const METRIC_TOTALS_SUFIX_ALL = 'ALL';
export const METRIC_TOTALS_PREFIX = 'totalSizeByType';

export enum Metric {
  BUNDLE_SIZE = 'totalSizeByTypeALL',
  INITIAL_SIZE_JS = 'totalInitialSizeJS',
  INITIAL_SIZE_CSS = 'totalInitialSizeCSS',
  CACHE_INVALIDATION = 'cacheInvalidation',
  ASSET_COUNT = 'assetCount',
  CHUNK_COUNT = 'chunkCount',
  MODULE_COUNT = 'moduleCount',
  DUPLICATE_MODULES_COUNT = 'duplicateModulesCount',
  DUPLICATE_CODE = 'duplicateCode',
  PACKAGE_COUNT = 'packageCount',
  DUPLICATE_PACKAGES_COUNT = 'duplicatePackagesCount',
  TOTAL_SIZE_JS = 'totalSizeByTypeJS',
  TOTAL_SIZE_CSS = 'totalSizeByTypeCSS',
  TOTAL_SIZE_IMG = 'totalSizeByTypeIMG',
  TOTAL_SIZE_MEDIA = 'totalSizeByTypeMEDIA',
  TOTAL_SIZE_FONT = 'totalSizeByTypeFONT',
  TOTAL_SIZE_HTML = 'totalSizeByTypeHTML',
  TOTAL_SIZE_OTHER = 'totalSizeByTypeOTHER',
}

export interface MetaChunk {
  id: string;
  name: string;
}

export interface Asset extends MetricRun {
  name: string;
  isEntry: boolean;
  isInitial: boolean;
  isChunk: boolean;
  chunkId?: string;
}

export type Assets = Record<string, Asset>;

export interface MetricsAssets {
  metrics: {
    assets: Assets;
  };
  meta?: {
    chunks: Array<MetaChunk>;
  };
}

export interface Module extends MetricRun {
  name: string;
  chunkIds: Array<string>;
  duplicated?: boolean;
}

export type Modules = Record<string, Module>;

export interface MetricsModules {
  metrics: {
    duplicateCode: MetricRun;
    duplicateModulesCount: MetricRun;
    modules: Modules;
    moduleCount: MetricRun;
  };
}

export interface Package extends MetricRun {
  name: string;
  path: string;
}

export type Packages = Record<string, Package>;

export interface MetricsPackages {
  metrics: {
    packages: Packages;
  };
}
