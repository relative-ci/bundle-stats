// eslint-disable-next-line import/no-extraneous-dependencies
import { StatsCompilation, StatsModule } from 'webpack';

const PATH_IGNORE_PATTERN = '.map$';

interface BundleStatsOptions {
  pathIgnorePattern?: string;
}

export interface WebpackStatsFilteredAsset {
  name: string;
  size?: number;
}

export interface WebpackStatsFilteredChunk {
  entry: boolean;
  id: number | string;
  initial: boolean;
  files?: Array<string>;
  names?: Array<string>;
}

export interface WebpackStatsFilteredModuleReason {
  module: string;
}

export interface WebpackStatsFilteredModule {
  name: string;
  size?: number;
  chunks: Array<string | number>;
  reasons?: Array<WebpackStatsFilteredModuleReason>;
}

export interface WebpackStatsFilteredConcatenatedModule {
  name: string;
  size?: number;
  reasons?: Array<WebpackStatsFilteredModuleReason>;
}

export interface WebpackStatsFilteredRootModule extends WebpackStatsFilteredModule {
  modules?: Array<WebpackStatsFilteredConcatenatedModule>;
}

export interface WebpackStatsFiltered {
  builtAt?: number;
  hash?: string;
  assets?: Array<WebpackStatsFilteredAsset>;
  chunks?: Array<WebpackStatsFilteredChunk>;
  modules?: Array<WebpackStatsFilteredRootModule>;
}

const getReasons = (
  moduleData: StatsModule,
): Array<WebpackStatsFilteredModuleReason> | undefined => {
  const reasonsByModule: Record<string, WebpackStatsFilteredModuleReason> = {};

  moduleData.reasons?.forEach((reason) => {
    // Add the reason module only once
    // webpack adds one entry for import and one entry for every reference
    if (reason.module && !reasonsByModule[reason.module]) {
      reasonsByModule[reason.module] = { module: reason.module };
    }
  });

  const reasons = Object.values(reasonsByModule);

  if (reasons.length === 0) {
    return undefined;
  }

  return reasons;
};

/**
 * Filter webpack stats data
 */
export default (
  source: StatsCompilation,
  options: BundleStatsOptions = {},
): WebpackStatsFiltered => {
  const pathIgnorePattern = new RegExp(options.pathIgnorePattern || PATH_IGNORE_PATTERN);

  // meta
  const { builtAt, hash } = source;

  // rawData
  const assets =
    source.assets?.reduce((agg, asset) => {
      // Skip assets with empty name or ignore pattern
      if (!asset.name || pathIgnorePattern.test(asset.name)) {
        return agg;
      }

      agg.push({
        name: asset.name,
        size: asset.size,
      });

      return agg;
    }, [] as Array<WebpackStatsFilteredAsset>) || [];

  const chunks =
    source.chunks?.reduce((agg, chunk) => {
      // Skip chunks with empty ids
      if (typeof chunk.id === 'undefined' || chunk.id === null) {
        return agg;
      }

      agg.push({
        id: chunk.id,
        entry: chunk.entry,
        initial: chunk.initial,
        files: chunk.files,
        names: chunk.names,
      });

      return agg;
    }, [] as Array<WebpackStatsFilteredChunk>) || [];

  const modules =
    source.modules?.reduce((agg, moduleStats) => {
      // Skip modules without name
      if (!moduleStats.name) {
        return agg;
      }

      const moduleChunks =
        moduleStats.chunks?.filter(
          (chunkId) => chunkId !== null && typeof chunkId !== 'undefined',
        ) || [];

      const concatenatedModules = moduleStats.modules?.reduce(
        (aggConcatenatedModules, concatenatedModule) => {
          if (!concatenatedModule.name) {
            return aggConcatenatedModules;
          }

          const reasons = getReasons(concatenatedModule);

          aggConcatenatedModules.push({
            name: concatenatedModule.name,
            size: concatenatedModule.size,
            ...(reasons && { reasons }),
          });

          return aggConcatenatedModules;
        },
        [] as Array<WebpackStatsFilteredConcatenatedModule>,
      );

      const reasons = getReasons(moduleStats);

      agg.push({
        name: moduleStats.name,
        size: moduleStats.size,
        chunks: moduleChunks,
        ...(concatenatedModules && { modules: concatenatedModules }),
        ...(reasons && { reasons }),
      });

      return agg;
    }, [] as Array<WebpackStatsFilteredRootModule>) || [];

  return {
    builtAt,
    hash,
    assets,
    chunks,
    modules,
  };
};
