// eslint-disable-next-line import/no-extraneous-dependencies
import { StatsCompilation } from 'webpack';

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

export interface WebpackStatsFilteredModuleIssuer {
  name: string;
}

export interface WebpackStatsFilteredModule {
  name: string;
  size?: number;
  chunks: Array<string | number>;
  issuerPath?: Array<WebpackStatsFilteredModuleIssuer>;
}

export interface WebpackStatsFilteredConcatenatedModule {
  name: string;
  size?: number;
  issuer?: string;
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

          aggConcatenatedModules.push({
            name: concatenatedModule.name,
            size: concatenatedModule.size,
          });

          return aggConcatenatedModules;
        },
        [] as Array<WebpackStatsFilteredConcatenatedModule>,
      );

      const issuerPath: Array<WebpackStatsFilteredModuleIssuer> = [];

      moduleStats.issuerPath?.forEach((issuer) => {
        if (issuer?.name) {
          issuerPath.push({
            name: issuer.name,
          });
        }
      });

      agg.push({
        name: moduleStats.name,
        size: moduleStats.size,
        chunks: moduleChunks,
        issuerPath,
        ...(concatenatedModules && { modules: concatenatedModules }),
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
