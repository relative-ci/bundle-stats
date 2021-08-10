import isEmpty from 'lodash/isEmpty';

import { ModuleMetric, WebpackMetricsModules } from '../../constants';
import { getModuleName, normalizeChunkId } from '../utils';

interface WebpackModule {
  name: string;
  size: number;
  chunks: Array<string | number>;
}

interface WebpackModuleWithConcatenatedModules extends WebpackModule {
  modules?: Array<Pick<WebpackModule, 'name' | 'size'>>;
}

/*
 * Extract webpack modules array to an object with metrics
 */
export const extractModules = (webpackStats?: any): WebpackMetricsModules => {
  const modulesSource: Array<WebpackModuleWithConcatenatedModules> = webpackStats?.modules || [];

  if (!modulesSource) {
    return { metrics: { modules: {} } };
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

  // Normalize module entries
  const modules = allModules.reduce((agg, moduleEntry) => {
    const { name, size, chunks } = moduleEntry;
    const normalizedName = getModuleName(name);

    // skip modules with no chunks
    if (isEmpty(chunks)) {
      return agg;
    }

    // eslint-disable-next-line no-param-reassign
    agg[normalizedName] = {
      name,
      value: size,
      chunkIds: chunks.map(normalizeChunkId),
    };

    return agg;
  }, {} as Record<string, ModuleMetric>);

  return { metrics: { modules } };
};
