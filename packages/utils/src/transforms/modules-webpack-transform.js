import { get } from 'lodash';

import { getModuleName } from '../modules';

const getChunkNames = (chunks = [], chunkId) => {
  const chunk = chunks.find(({ id }) => id === chunkId);

  if (!chunk) {
    return [];
  }

  return chunk.names;
};

/*
 * Transform webpack modules array to an object with metrics
 */
export const modulesWebpackTransform = (webpackStats = {}) => {
  const { chunks, modules } = webpackStats;

  if (!modules) {
    return { modules: {} };
  }

  const modulesByChunk = modules.reduce((aggregator, moduleEntry) => {
    const {
      name,
      size,
      chunks: moduleChunks,
      ...restModuleProps
    } = moduleEntry;

    const moduleMetric = {
      ...restModuleProps,
      name,
      value: size,
    };
    const normalizedName = getModuleName(name);

    return moduleChunks.reduce((aggWithChunks, chunkId) => ({
      ...aggWithChunks,
      [chunkId]: {
        chunkNames: getChunkNames(chunks, chunkId),
        modules: {
          ...get(aggWithChunks, [chunkId, 'modules']),
          [normalizedName]: moduleMetric,
        },
      },
    }), aggregator);
  }, {});

  return {
    modules: modulesByChunk,
  };
};
