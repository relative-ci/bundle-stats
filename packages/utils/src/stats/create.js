import { get, merge, set } from 'lodash';

import {
  calculateCacheInvalidation, calculateTotals, calculateInitialTotals,
} from '../assets';
import {
  getMetricChanged, getMetricAdded, getMetricDeleted, mergeRunsById,
} from '../metrics';
import { getAssetsMetrics } from '../utils/get-assets-metrics';

export const generateWebpackTotals = key => (_, rawData) => {
  const totals = calculateTotals(get(rawData, 'webpack.stats.assets'));

  return set({}, key, totals);
};

export const generateWebpackInitialTotals = key => (_, rawData) => {
  const initialTotals = calculateInitialTotals(
    get(rawData, 'webpack.stats.assets'),
    get(rawData, 'webpack.stats.chunks'),
  );

  return set({}, key, initialTotals);
};

export const generateCacheInvalidation = key => (baseline, current) => {
  const baselineMetrics = getAssetsMetrics(get(baseline, 'webpack.stats.assets', []));
  const currentAssets = getAssetsMetrics(get(current, 'webpack.stats.assets', []));

  const rows = mergeRunsById([currentAssets, baselineMetrics]).map(row => merge(
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

export const generateModulesCount = key => (_, current) => {
  const value = get(current, 'webpack.stats.modules', []).length;

  return set({}, key, { value });
};

export const generateChunksCount = key => (_, current) => {
  const value = get(current, 'webpack.stats.chunks', []).length;

  return set({}, key, { value });
};

export const generateAssetsCount = key => (_, current) => {
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
].map(transform => transform(baselineRawData, currentRawData)).reduce(merge, {});
