import { get, merge, set } from 'lodash';

import { SOURCE_PATH_WEBPACK_STATS } from '../config';
import {
  extractAssets,
  extractAssetsCacheInvalidation,
  extractAssetsChunkCount,
  extractAssetsCount,
  extractAssetsSize,
  extractModules,
  extractModulesCount,
  extractModulesPackages,
  extractModulesPackagesCount,
  extractModulesPackagesDuplicate,
} from '../webpack';

export const generateWebpackTotals = (key) => (_, current) => {
  // @NOTE Temporary generation of normalized assets
  const { sizes } = extractAssetsSize(current);

  return set({}, key, sizes);
};

export const generateCacheInvalidation = (key) => (baseline, current) => {
  const { stats } = extractAssetsCacheInvalidation(current, baseline);
  return set({}, key, stats.cacheInvalidation);
};

export const generatePackageCount = (key) => (_, current) => {
  const { stats } = extractModulesPackagesCount(extractModulesPackages(current));
  return set({}, key, stats.packageCount);
};

export const generateDuplicatedPackageCount = (key) => (_, current) => {
  const { stats } = extractModulesPackagesDuplicate(extractModulesPackages(current));
  return set({}, key, stats.duplicatePackagesCount);
};

export const generateModuleCount = (key) => (_, current) => {
  const { stats } = extractModulesCount(current);
  return set({}, key, stats.moduleCount);
};

export const generateChunkCount = (key) => (_, current) => {
  const { stats } = extractAssetsChunkCount(current);

  return set({}, key, stats.chunkCount);
};

export const generateAssetCount = (key) => (_, current) => {
  const { stats } = extractAssetsCount(current);

  return set({}, key, stats.assetCount);
};

export const createStats = (baselineRawData, currentRawData) => {
  const baselineWebpackStats = get(baselineRawData, SOURCE_PATH_WEBPACK_STATS);
  const baselineBundle = {
    ...extractAssets(baselineWebpackStats),
    ...extractModules(baselineWebpackStats),
  };

  const currentWebpackStats = get(currentRawData, SOURCE_PATH_WEBPACK_STATS);
  const currentBundle = {
    ...extractAssets(currentWebpackStats),
    ...extractModules(currentWebpackStats),
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
