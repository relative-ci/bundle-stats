import { get } from 'lodash';

import { getModuleName } from './get-module-name';

const getChunkNames = (chunks = [], chunkId) => {
  const chunk = chunks.find(({ id }) => id === chunkId);

  if (!chunk) {
    return [];
  }

  return chunk.names;
};


/*
 * Transform modules array to an object with metrics
 */
export const getModulesMetrics = (modules = [], rawData = {}) => {
  const { chunks } = rawData;

  return modules.reduce((aggregator, moduleEntry) => {
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
};
