import get from 'lodash/get';

export const extractAssetsChunkCount = (webpackStats, currentExtractedData = {}) => {
  const assets = get(currentExtractedData, 'metrics.assets');

  const value = Object.values(assets).filter(({ isChunk }) => isChunk).length;

  return { metrics: { chunkCount: { value } } };
};
