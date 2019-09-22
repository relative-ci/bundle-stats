import { get, merge } from 'lodash';

export const createStatsSummary = (baselineStats, currentStats) => {
  const metrics = [
    'webpack.assets.totalSizeByTypeALL',
    'webpack.assets.totalInitialSizeJS',
    'webpack.assets.totalInitialSizeCSS',
    'webpack.cacheInvalidation',
    'webpack.modulesCount',
    'webpack.chunksCount',
    'webpack.assetsCount',
    'webpack.packageCount',
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
