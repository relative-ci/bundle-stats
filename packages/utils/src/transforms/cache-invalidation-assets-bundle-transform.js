import { get, merge } from 'lodash';

import { calculateCacheInvalidation } from '../assets';
import {
  getMetricChanged, getMetricAdded, getMetricDeleted, mergeRunsById,
} from '../metrics';

export const cacheInvalidationAssetsBundleTransform = (bundleStats, baselineBundleStats) => {
  const currentAssets = get(bundleStats, 'assets', []);
  const baselineAssets = get(baselineBundleStats, 'assets', []);

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
    stats: {
      cacheInvalidation: {
        value,
      },
    },
  };
};
