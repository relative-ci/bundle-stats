import { get, merge } from 'lodash';

export const createStatsSummary = (baselineStats, currentStats) => {
  const metrics = [
    'webpack.assets.totalSizeByTypeALL',
    'webpack.assets.totalInitialSizeJS',
    'webpack.assets.totalInitialSizeCSS',
    'webpack.cacheInvalidation',
    'webpack.moduleCount',
    'webpack.chunkCount',
    'webpack.assetCount',
    'webpack.packageCount',
    'webpack.duplicatePackagesCount',
  ];

  return metrics.map((metric) => {
    const baselineValue = get(baselineStats, `${metric}.value`, 0);
    const currentValue = get(currentStats, `${metric}.value`, 0);

    return {
      [metric]: {
        baseline: baselineValue,
        current: currentValue,
      },
    };
  }).reduce((agg, current) => merge({}, agg, current), {});
};
