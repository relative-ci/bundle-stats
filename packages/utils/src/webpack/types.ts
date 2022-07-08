import { Metric, MetricRun } from '../constants';

interface MetaChunk {
  id: string;
  name: string;
}

export interface Asset extends Metric {
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

export interface Module extends Metric {
  name: string;
  chunkIds: Array<String>;
  duplicated: boolean;
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

export interface Package extends Metric {
  path: string;
}

export type Packages = Record<string, Package>;

export interface MetricsPackages {
  metrics: {
    packages: Packages;
  };
}
