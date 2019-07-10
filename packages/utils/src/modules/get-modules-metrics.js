import { get } from 'lodash';

/*
 * Transform modules array to an object with metrics
 */
export const getModulesMetrics = (modules = []) => modules.reduce((aggregator, moduleEntry) => {
  const {
    name, size, chunks, ...restModuleProps
  } = moduleEntry;
  const moduleMetric = { ...restModuleProps, value: size };

  return chunks.reduce((aggWithChunks, chunkId) => ({
    ...aggWithChunks,
    [chunkId]: {
      modules: {
        ...get(aggWithChunks, [chunkId, 'modules']),
        [name]: moduleMetric,
      },
    },
  }), aggregator);
}, {});
