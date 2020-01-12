import { get, pick } from 'lodash';

import { SUMMARY_METRIC_PATHS } from './constants';

const getStatsMetrics = (job) => {
  const data = get(job, 'metrics.webpack');
  const metrics = pick(data, SUMMARY_METRIC_PATHS);

  // Rename metric keys
  return Object.entries(metrics).reduce((agg, [key, value]) => ({
    ...agg,
    [`webpack.${key}`]: value,
  }), {});
};

const getSizeMetrics = (job) => {
  const metrics = get(job, 'metrics.webpack.sizes', {});

  // rename metric keys
  return Object.entries(metrics).reduce((agg, [key, value]) => ({
    ...agg,
    [`webpack.sizes.${key}`]: value,
  }), {});
};

const getAssetsMetrics = (job) => get(job, 'metrics.webpack.assets', {});

const getPackageMetrics = (job) => get(job, 'metrics.webpack.packages', {});

const getModulesMetrics = (job) => get(job, 'metrics.webpack.modules', {});

export const selectors = {
  stats: getStatsMetrics,
  sizes: getSizeMetrics,
  assets: getAssetsMetrics,
  packages: getPackageMetrics,
  modules: getModulesMetrics,
};
