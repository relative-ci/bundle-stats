import { get, merge, set } from 'lodash';

import {
  assetsWebpackTransform,
  modulesWebpackTransform,
  cacheInvalidationAssetsBundleTransform,
  countAssetsBundleTransform,
  countModulesBundleTransform,
  chunksCountAssetsBundleTransform,
  sizeAssetsBundleTransform,
} from '../transforms';

export const generateWebpackTotals = (key) => (_, current) => {
  // @NOTE Temporary generation of normalized assets
  const { sizes } = sizeAssetsBundleTransform(current);

  return set({}, key, sizes);
};

export const generateCacheInvalidation = (key) => (baseline, current) => {
  const { stats } = cacheInvalidationAssetsBundleTransform(current, baseline);
  return set({}, key, stats.cacheInvalidation);
};

export const generateModulesCount = (key) => (_, current) => {
  const { stats } = countModulesBundleTransform(current);
  return set({}, key, stats.modulesCount);
};

export const generateChunksCount = (key) => (_, current) => {
  const { stats } = chunksCountAssetsBundleTransform(current);

  return set({}, key, stats.chunksCount);
};

export const generateAssetsCount = (key) => (_, current) => {
  const { stats } = countAssetsBundleTransform(current);

  return set({}, key, stats.assetsCount);
};

export const createStats = (baselineRawData, currentRawData) => {
  const baselineWebpackStats = get(baselineRawData, 'webpack.stats');
  const baselineBundle = {
    ...assetsWebpackTransform(baselineWebpackStats),
    ...modulesWebpackTransform(baselineWebpackStats),
  };

  const currentWebpackStats = get(currentRawData, 'webpack.stats');
  const currentBundle = {
    ...assetsWebpackTransform(currentWebpackStats),
    ...modulesWebpackTransform(currentWebpackStats),
  };

  return [
    generateWebpackTotals('webpack.assets'),
    generateCacheInvalidation('webpack.cacheInvalidation'),
    generateModulesCount('webpack.modulesCount'),
    generateChunksCount('webpack.chunksCount'),
    generateAssetsCount('webpack.assetsCount'),
  ].map((transform) => transform(baselineBundle, currentBundle)).reduce(merge, {});
};
