import merge from 'lodash/merge';

import { extractAssets } from './assets';
import { extractAssetsCacheInvalidation } from './assets-cache-invalidation';
import { extractAssetsChunkCount } from './assets-chunk-count';
import { extractAssetsCount } from './assets-count';
import { extractAssetsSize } from './assets-size';
import { extractAssetsSizeTotalInsight } from './assets-size-total-insight';
import { extractMeta } from './meta';
import { extractModules } from './modules';
import { extractModulesPackages } from './modules-packages';
import { extractModulesPackagesCount } from './modules-packages-count';
import { extractModulesPackagesDuplicate } from './modules-packages-duplicate';
import { extractModulesPackagesNewInsight } from './modules-packages-new-insight';

const extractFns = [
  extractAssets,
  extractAssetsCacheInvalidation,
  extractAssetsChunkCount,
  extractAssetsCount,
  extractAssetsSize,
  extractAssetsSizeTotalInsight,
  extractMeta,
  extractModules,
  extractModulesPackages,
  extractModulesPackagesCount,
  extractModulesPackagesDuplicate,
  extractModulesPackagesNewInsight,
];

export const extract = (webpackStats, baseline) =>
  extractFns.reduce((agg, extractFn) => merge({}, agg, extractFn(webpackStats, agg, baseline)), {});
