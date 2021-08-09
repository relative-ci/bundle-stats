import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import { getModuleName, normalizeChunkId } from '../utils';

/*
 * Extract webpack modules array to an object with metrics
 */
export const extractModules = (webpackStats = {}) => {
  const modulesSource = get(webpackStats, 'modules', []);

  if (!modulesSource) {
    return { modules: {} };
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
  }, []);

  // Extracted modules
  const modulesByChunk = allModules.reduce((agg, moduleEntry) => {
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
  }, {});

  return {
    metrics: {
      modules: modulesByChunk,
    },
  };
};
