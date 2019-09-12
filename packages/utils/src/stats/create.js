import { get, merge, set } from 'lodash';

import {
  calculateCacheInvalidation, calculateTotals, calculateInitialTotals,
} from '../assets';
import {
  getMetricChanged, getMetricAdded, getMetricDeleted, mergeRunsById,
} from '../metrics';
import { assetsWebpackTransform } from '../transforms';

export const generateWebpackTotals = (key) => (_, rawData) => {
  const totals = calculateTotals(get(rawData, 'webpack.stats.assets'));

  return set({}, key, totals);
};

export const generateWebpackInitialTotals = (key) => (_, rawData) => {
  const initialTotals = calculateInitialTotals(
    get(rawData, 'webpack.stats.assets'),
    get(rawData, 'webpack.stats.chunks'),
  );

  return set({}, key, initialTotals);
};

export const generateCacheInvalidation = (key) => (baseline, current) => {
  const { assets: baselineAssets } = assetsWebpackTransform(get(baseline, 'webpack.stats'));
  const { assets: currentAssets } = assetsWebpackTransform(get(current, 'webpack.stats'));

  const rows = mergeRunsById([currentAssets, baselineAssets]).map((row) => merge(
    {},
    row,
    {
      changed: getMetricChanged(row.runs),
      added: getMetricAdded(row.runs),
      deleted: getMetricDeleted(row.runs),
    },
  ));

  const value = calculateCacheInvalidation(rows);

  return set({}, key, { value });
};

export const generateModulesCount = (key) => (_, current) => {
  const value = get(current, 'webpack.stats.modules', []).length;

  return set({}, key, { value });
};

export const generateChunksCount = (key) => (_, current) => {
  const value = get(current, 'webpack.stats.chunks', []).length;

  return set({}, key, { value });
};

export const generateAssetsCount = (key) => (_, current) => {
  const value = get(current, 'webpack.stats.assets', []).length;

  return set({}, key, { value });
};

export const createStats = (baselineRawData, currentRawData) => [
  generateWebpackTotals('webpack.assets'),
  generateWebpackInitialTotals('webpack.assets'),
  generateCacheInvalidation('webpack.cacheInvalidation'),
  generateModulesCount('webpack.modulesCount'),
  generateChunksCount('webpack.chunksCount'),
  generateAssetsCount('webpack.assetsCount'),
].map((transform) => transform(baselineRawData, currentRawData)).reduce(merge, {});
