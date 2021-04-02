import get from 'lodash/get';

export const extractAssetsCount = (webpackStats, currentExtractedData = {}) => {
  const assets = get(currentExtractedData, 'metrics.assets', {});
  const value = Object.keys(assets).length;

  return { metrics: { assetCount: { value } } };
};
