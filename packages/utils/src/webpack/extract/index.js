import merge from 'lodash/merge';

import * as budgetsInsights from '../../transformers/budgets-insights';
import { extractAssets } from './assets';
import { extractAssetsCacheInvalidation } from './assets-cache-invalidation';
import { extractAssetsChunkCount } from './assets-chunk-count';
import { extractAssetsCount } from './assets-count';
import { extractAssetsSize } from './assets-size';
import { extractAssetsSizeTotalInsight } from './assets-size-total-insight';
import { extractMeta } from './meta';
import { extractModules } from './modules';
import { extractModulesCount } from './modules-count';
import { extractModulesPackages } from './modules-packages';
import { extractModulesPackagesCount } from './modules-packages-count';
import { extractModulesPackagesDuplicate } from './modules-packages-duplicate';

const extractFns = [
  extractAssets,
  extractAssetsCacheInvalidation,
  extractAssetsChunkCount,
  extractAssetsCount,
  extractAssetsSize,
  extractAssetsSizeTotalInsight,
  extractMeta,
  extractModules,
  extractModulesCount,
  extractModulesPackages,
  extractModulesPackagesCount,
  extractModulesPackagesDuplicate,
  budgetsInsights.getExtract('webpack'),
];

export const extract = (webpackStats, baseline, options) =>
  extractFns.reduce(
    (agg, extractFn) => merge({}, agg, extractFn(webpackStats, agg, baseline, options)),
    {},
  );
