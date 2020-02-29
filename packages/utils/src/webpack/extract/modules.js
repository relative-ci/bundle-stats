import { get } from 'lodash';

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

  const modulesByChunk = modules.reduce((aggregator, moduleEntry) => {
    const {
      name,
      size,
    } = moduleEntry;

    const moduleChunks = get(moduleEntry, 'chunks', []);
    const normalizedName = getModuleName(name);

    return moduleChunks.reduce((aggWithChunks, chunkId) => ({
      ...aggWithChunks,
      [chunkId]: {
        chunkNames: getChunkNames(chunks, chunkId),
        modules: {
          ...get(aggWithChunks, [chunkId, 'modules']),
          [normalizedName]: {
            name,
            value: size,
          },
        },
      },
    }), aggregator);
  }, {});

  return {
    metrics: {
      modules: modulesByChunk,
    },
  };
};
