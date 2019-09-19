import { merge } from 'lodash';

import { calculateCacheInvalidation } from '../assets';
import {
  getMetricChanged, getMetricAdded, getMetricDeleted, mergeRunsById,
} from '../metrics';

export const cacheInvalidationAssetsTransform = (bundleStats = {}, baselineBundleStats = {}) => {
  const { assets: currentAssets } = bundleStats;
  const { assets: baselineAssets } = baselineBundleStats;

  const rows = mergeRunsById([currentAssets, baselineAssets]).map((row) => merge(
    {},
    row,
    {
      changed: getMetricChanged(row.runs),
      added: getMetricAdded(row.runs),
      deleted: getMetricDeleted(row.runs),
    },
  ));

  const cacheInvalidation = calculateCacheInvalidation(rows);

  return {
    stats: {
      cacheInvalidation,
    },
  };
};
