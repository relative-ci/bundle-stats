import get from 'lodash/get';
import merge from 'lodash/merge';

import { getMetricChanged } from '../../report/get-metric-changed';
import { mergeMetricsByKey } from '../../report/merge-metrics-by-key';
import { calculateCacheInvalidation, getMetricAdded, getMetricDeleted } from '../utils';

export const extractAssetsCacheInvalidation = (
  webpackStats, currentExtractedData, baselineBundleStats,
) => {
  const currentAssets = get(currentExtractedData, 'metrics.assets', {});
  const baselineAssets = get(baselineBundleStats, 'metrics.webpack.assets', {});

  const rows = mergeMetricsByKey([currentAssets, baselineAssets]).map((row) => merge(
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
