import isEmpty from 'lodash/isEmpty';
import round from 'lodash/round';

import { ModuleMetric, WebpackMetricsModules } from '../../constants';
import { getModuleName, normalizeChunkId } from '../utils';

interface WebpackModule {
  name: string;
  size: number;
  chunks: Array<string | number>;
}

interface WebpackModuleWithConcatenatedModules extends WebpackModule {
  modules: Array<Pick<WebpackModule, 'name' | 'size'>>;
}

/*
 * Extract webpack modules array to an object with metrics
 */
export const extractModules = (webpackStats?: any): WebpackMetricsModules => {
  const modulesSource: Array<WebpackModuleWithConcatenatedModules> = webpackStats?.modules || [];

  if (!modulesSource) {
    return {
      metrics: {
        duplicateCode: { value: 0 },
        duplicateModulesCount: { value: 0 },
        modules: {},
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
  }, [] as Array<WebpackModule>);

  let totalCodeSize = 0;
  let duplicateCodeSize = 0;
  let duplicateModulesCount = 0;

  // Normalize module entries
  const modules = allModules.reduce((agg, moduleEntry) => {
    const { name, size, chunks } = moduleEntry;
    const normalizedName = getModuleName(name);

    // skip modules that do not belong to any chunk
    if (isEmpty(chunks)) {
      return agg;
    }

    const instances = chunks.length;
    const duplicateInstances = instances - 1;

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
  }, {} as Record<string, ModuleMetric>);

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
    },
  };
};
