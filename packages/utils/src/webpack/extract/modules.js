import get from 'lodash/get';

import { getModuleName } from '../utils';

const getChunkNames = (chunks = [], chunkId) => {
  const chunk = chunks.find(({ id }) => id === chunkId);

  if (!chunk) {
    return [];
  }

  return chunk.names;
};

/*
 * Extract webpack modules array to an object with metrics
 */
export const extractModules = (webpackStats = {}) => {
  const chunks = get(webpackStats, 'chunks', []);
  const modules = get(webpackStats, 'modules', []);

  if (!modules) {
    return { modules: {} };
  }

  // Flatten concatenated modules
  const allModules = modules.reduce((agg, moduleEntry) => {
    if (!moduleEntry.modules) {
      return [...agg, moduleEntry];
    }

    return [
      ...agg,
      ...moduleEntry.modules.map((concatenatedModule) => ({
        ...concatenatedModule,
        // Add parent chunks
        chunks: moduleEntry.chunks,
      })),
    ];
  }, []);

  const modulesByChunk = allModules.reduce((aggregator, moduleEntry) => {
    const { name, size } = moduleEntry;

    const moduleChunks = get(moduleEntry, 'chunks', []);
    const normalizedName = getModuleName(name);

    return moduleChunks.reduce(
      (aggWithChunks, chunkId) => ({
        ...aggWithChunks,
        [chunkId.toString()]: {
          chunkNames: getChunkNames(chunks, chunkId),
          modules: {
            ...get(aggWithChunks, [chunkId, 'modules']),
            [normalizedName]: {
              name,
              value: size,
            },
          },
        },
      }),
      aggregator,
    );
  }, {});

  return {
    metrics: {
      modules: modulesByChunk,
    },
  };
};
