import { get } from 'lodash';

import { getModuleName } from './get-module-name';

/*
 * Transform modules array to an object with metrics
 */
export const getModulesMetrics = (modules = []) => modules.reduce((aggregator, moduleEntry) => {
  const {
    name, size, chunks, ...restModuleProps
  } = moduleEntry;
  const moduleMetric = {
    ...restModuleProps,
    name,
    value: size,
  };
  const normalizedName = getModuleName(name);

  return chunks.reduce((aggWithChunks, chunkId) => ({
    ...aggWithChunks,
    [chunkId]: {
      modules: {
        ...get(aggWithChunks, [chunkId, 'modules']),
        [normalizedName]: moduleMetric,
      },
    },
  }), aggregator);
}, {});
