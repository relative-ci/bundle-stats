import { get, merge } from 'lodash';

import { getMetricChanged } from '../../metrics/get-metric-changed';
import { mergeRunsById } from '../../report/merge-runs-by-id';
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
