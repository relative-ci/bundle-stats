import { omit } from './utils/omit';

import {
  type ExcludeFilepathPatterns,
  checkExcludeFilepath,
} from './utils/check-exclude-filepath';
import type {
  OutputAsset,
  OutputBundle,
  OutputChunk,
  RenderedModule,
} from './types';

export type AssetStatsOptionalProperties = {
  source?: OutputAsset['source'];
};

export type AssetStats = Omit<OutputAsset, keyof AssetStatsOptionalProperties> &
  AssetStatsOptionalProperties;

export type ModuleStatsOptionalProperties = {
  code?: RenderedModule['code'] | null;
};

export type ModuleStats = Omit<
  RenderedModule,
  keyof ModuleStatsOptionalProperties
> &
  ModuleStatsOptionalProperties;

export type ChunkStatsOptionalProperties = {
  code?: OutputChunk['code'];
  map?: OutputChunk['map'];
};

export type ChunkStats = Omit<
  OutputChunk,
  keyof ChunkStatsOptionalProperties | 'modules'
> & {
  modules: Record<string, ModuleStats>;
} & ChunkStatsOptionalProperties;

export type Stats = Record<string, AssetStats | ChunkStats>;

export type StatsOptions = {
  /**
   * Output asset/module sources
   * @default false
   */
  source?: boolean;
  /**
   * Output chunk map
   * @default false
   */
  map?: boolean;
  /**
   * Exclude matching assets
   */
  excludeAssets?: ExcludeFilepathPatterns;
  /**
   * Exclude matching modules
   */
  excludeModules?: ExcludeFilepathPatterns;
};

/**
 * Extract bundler stats
 *
 * Shallow clone stats object before any processing using `omit` to
 * 1. resolve getters
 * 2. prevent changes to the stats object
 *
 * @NOTE structuredClone is not supported by rolldown-vite: https://github.com/vitejs/rolldown-vite/issues/128
 */
export default function extractRollupStats(
  bundle: OutputBundle,
  options: StatsOptions = {}
): Stats {
  const {
    source = false,
    map = false,
    excludeAssets,
    excludeModules,
  } = options;

  const output: Stats = {};

  Object.entries(bundle).forEach(([bundleEntryFilepath, bundleEntryStats]) => {
    // Skip extraction if the entry filepath matches the exclude assets pattern
    if (checkExcludeFilepath(bundleEntryFilepath, excludeAssets)) {
      return;
    }

    if (bundleEntryStats.type === 'asset') {
      const assetStatsOmitKeys: Array<keyof AssetStatsOptionalProperties> = [];

      // Skip asset source if options.source is false
      if (!source) {
        assetStatsOmitKeys.push('source');
      }

      output[bundleEntryFilepath] = omit(
        bundleEntryStats,
        assetStatsOmitKeys
      ) as AssetStats;

      return;
    }

    if (bundleEntryStats.type === 'chunk') {
      const chunkStatsOmitKeys: Array<keyof ChunkStatsOptionalProperties> = [];

      // Skip chunk source if options.source is false
      if (!source) {
        chunkStatsOmitKeys.push('code');
      }

      // Skip chunk map if options.map is false
      if (!map) {
        chunkStatsOmitKeys.push('map');
      }

      const chunkStats = omit(
        bundleEntryStats,
        chunkStatsOmitKeys
      ) as ChunkStats;

      // Extract chunk modules stats
      const chunkModulesStats: ChunkStats['modules'] = {};

      Object.entries(chunkStats.modules).forEach(
        ([bundleModuleFilepath, bundleModuleStats]) => {
          // Skip module extraction if the filepath matches the exclude modules pattern
          if (checkExcludeFilepath(bundleModuleFilepath, excludeModules)) {
            return;
          }

          const moduleStatsOmitKeys: Array<
            keyof ModuleStatsOptionalProperties
          > = [];

          // Skip module source if options.source is false
          if (!source) {
            moduleStatsOmitKeys.push('code');
          }

          chunkModulesStats[bundleModuleFilepath] = omit(
            bundleModuleStats,
            moduleStatsOmitKeys
          ) as ModuleStats;
        }
      );

      chunkStats.modules = chunkModulesStats;

      output[bundleEntryFilepath] = chunkStats;

      return;
    }
  });

  return output;
}
