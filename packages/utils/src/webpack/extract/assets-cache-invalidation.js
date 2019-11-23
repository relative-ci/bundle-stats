import { get, merge } from 'lodash';

import { getMetricChanged, mergeRunsById } from '../../metrics';
import { calculateCacheInvalidation, getMetricAdded, getMetricDeleted } from '../utils';

export const extractAssetsCacheInvalidation = (
  webpackStats, currentExtractedData, baselineBundleStats,
) => {
  const currentAssets = get(currentExtractedData, 'metrics.assets', {});
  const baselineAssets = get(baselineBundleStats, 'metrics.webpack.assets', {});

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

  return {
    metrics: {
      cacheInvalidation: {
        value,
      },
    },
  };
};
