import { get, merge, set } from 'lodash';

import {
  assetsWebpackTransform,
  packagesModulesBundleTransform,
  modulesWebpackTransform,
  cacheInvalidationAssetsBundleTransform,
  countAssetsBundleTransform,
  countPackagesBundleTransform,
  countDuplicatePackagesBundleTransform,
  countModulesBundleTransform,
  chunkCountAssetsBundleTransform,
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

export const generatePackageCount = (key) => (_, current) => {
  const { stats } = countPackagesBundleTransform(packagesModulesBundleTransform(current));
  return set({}, key, stats.packageCount);
};

export const generateDuplicatedPackageCount = (key) => (_, current) => {
  const { stats } = countDuplicatePackagesBundleTransform(packagesModulesBundleTransform(current));
  return set({}, key, stats.duplicatePackagesCount);
};

export const generateModuleCount = (key) => (_, current) => {
  const { stats } = countModulesBundleTransform(current);
  return set({}, key, stats.moduleCount);
};

export const generateChunkCount = (key) => (_, current) => {
  const { stats } = chunkCountAssetsBundleTransform(current);

  return set({}, key, stats.chunkCount);
};

export const generateAssetCount = (key) => (_, current) => {
  const { stats } = countAssetsBundleTransform(current);

  return set({}, key, stats.assetCount);
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
    generatePackageCount('webpack.packageCount'),
    generateDuplicatedPackageCount('webpack.duplicatePackagesCount'),
    generateModuleCount('webpack.moduleCount'),
    generateChunkCount('webpack.chunkCount'),
    generateAssetCount('webpack.assetCount'),
  ].map((transform) => transform(baselineBundle, currentBundle)).reduce(merge, {});
};
