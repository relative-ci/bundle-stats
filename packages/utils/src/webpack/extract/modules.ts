import round from 'lodash/round';
import { WebpackStatsFiltered, WebpackStatsFilteredRootModule } from '@bundle-stats/plugin-webpack-filter';

import { Module, MetricsModules } from '../types';
import { getModuleName, normalizeChunkId } from '../utils';

/*
 * Extract webpack modules array to an object with metrics
 */
export const extractModules = (webpackStats?: WebpackStatsFiltered): MetricsModules => {
  const modulesSource = webpackStats?.modules;

  if (!modulesSource) {
    return {
      metrics: {
        duplicateCode: { value: 0 },
        duplicateModulesCount: { value: 0 },
        modules: {},
        moduleCount: { value: 0 },
      },
    };
  }

  // Flatten concatenated modules
  const allModules = modulesSource.reduce((agg, moduleEntry) => {
    if (!moduleEntry.modules) {
      agg.push(moduleEntry);

      return agg;
    }

    // eslint-disable-next-line no-param-reassign
    agg = agg.concat(
      moduleEntry.modules.map((concatenatedModule) => ({
        ...concatenatedModule,
        // Add parent chunks
        chunks: moduleEntry.chunks,
      })),
    );

    return agg;
  }, [] as Array<WebpackStatsFilteredRootModule>);

  let moduleCount = 0;
  let totalCodeSize = 0;
  let duplicateCodeSize = 0;
  let duplicateModulesCount = 0;

  // Normalize module entries
  const modules = allModules.reduce((agg, moduleEntry) => {
    const { name, size = 0, chunks } = moduleEntry;
    const normalizedName = getModuleName(name);

    // skip modules that do not belong to any chunk
    if (!chunks || chunks?.length === 0) {
      return agg;
    }

    const instances = chunks.length;
    const duplicateInstances = instances - 1;

    moduleCount += instances;
    duplicateModulesCount += duplicateInstances;
    duplicateCodeSize += duplicateInstances * size;
    totalCodeSize += instances * size;

    // eslint-disable-next-line no-param-reassign
    agg[normalizedName] = {
      name,
      value: size,
      chunkIds: chunks.map(normalizeChunkId),
      duplicated: Boolean(duplicateInstances),
    };

    return agg;
  }, {} as Record<string, Module>);

  const duplicateCode = totalCodeSize ? round((duplicateCodeSize / totalCodeSize) * 100, 2) : 0;

  return {
    metrics: {
      modules,
      duplicateCode: {
        value: duplicateCode,
      },
      duplicateModulesCount: {
        value: duplicateModulesCount,
      },
      moduleCount: {
        value: moduleCount,
      },
    },
  };
};
