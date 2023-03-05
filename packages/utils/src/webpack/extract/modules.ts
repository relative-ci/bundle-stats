import round from 'lodash/round';
import union from 'lodash/union';
import { WebpackStatsFiltered, WebpackStatsFilteredModule } from '@bundle-stats/plugin-webpack-filter';

import { Module, MetricsModules } from '../types';
import { getModuleName, normalizeChunkId } from '../utils';

/*
 * Extract webpack modules metrics and stats
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
  const modulesByName: Map<string, WebpackStatsFilteredModule> = new Map();

  modulesSource.forEach((rootModule) => {
    // skip modules that do not belong to any chunk
    if (!rootModule.chunks || rootModule.chunks.length === 0) {
      return;
    }

    // flatten concatenated modules
    if (rootModule.modules) {
      rootModule.modules.forEach((concatenatedModule) => {
        const concatenatedModuleName = getModuleName(concatenatedModule.name);
        const existingModule = modulesByName.get(concatenatedModuleName);

        // Merge if the module is already available
        // webpack adds a module entry for every concatenated module
        if (existingModule) {
          modulesByName.set(concatenatedModuleName, {
            ...existingModule,
            chunks: union(existingModule.chunks, rootModule.chunks),
          });
        } else {
          modulesByName.set(concatenatedModuleName, {
            ...concatenatedModule,
            chunks: rootModule.chunks,
          });
        }
      });

      return;
    }

    const normalizedName = getModuleName(rootModule.name);
    const savedRootModule = modulesByName.get(normalizedName);

    // Merge module data
    // @NOTE some webpack plugins (mini-css-extract-plugin) might add a root module entry
    // even if thee module was already concantenated in another module
    if (savedRootModule) {
      modulesByName.set(normalizedName, {
        ...savedRootModule,
        chunks: union(savedRootModule.chunks, rootModule.chunks),
        size: rootModule.size,
      });

      return;
    }

    modulesByName.set(normalizedName, rootModule);
  });

  // Normalize module entries and extract metrics
  const modules: Record<string, Module> = {};

  let moduleCount = 0;
  let totalCodeSize = 0;
  let duplicateCodeSize = 0;
  let duplicateModulesCount = 0;

  modulesByName.forEach((moduleEntry, normalizedName) => {
    const { name, size = 0, chunks } = moduleEntry;

    const instances = chunks.length;
    const duplicateInstances = instances - 1;
    const duplicated = duplicateInstances > 0;

    moduleCount += instances;
    totalCodeSize += instances * size;

    if (duplicated) {
      duplicateModulesCount += duplicateInstances;
      duplicateCodeSize += duplicateInstances * size;
    }

    modules[normalizedName] = {
      name,
      value: size,
      chunkIds: chunks.map(normalizeChunkId),
      ...(duplicated && { duplicated }),
    };
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
