import {
  flatMap, get, isEmpty, map, pick, uniq,
} from 'lodash';

import { METRIC_TYPE_FILE_SIZE } from '../config';
import * as webpack from '../webpack';
import { mergeRunsById } from './merge-runs-by-id';
import { addRowData } from './add-row-data';

const getWebpackSizesMetrics = (job) => {
  const metrics = get(job, 'metrics.webpack.sizes', {});

  return Object.entries(metrics).reduce((agg, [key, value]) => ({
    ...agg,
    [`webpack.sizes.${key}`]: value,
  }), {});
};

const getWebpackStatsMetrics = (job) => {
  const metrics = pick(get(job, 'metrics.webpack', {}), webpack.SUMMARY_METRIC_PATHS);

  return Object.entries(metrics).reduce((agg, [key, value]) => ({
    ...agg,
    [`webpack.${key}`]: value,
  }), {});
};

export const getModulesReport = (jobs) => map(
  uniq(flatMap(jobs, (job) => Object.keys(get(job, 'metrics.webpack.modules', {})))),

  (chunkId) => ({
    chunkId,
    chunkNames: uniq(flatMap(jobs, (job) => get(job, ['metrics', 'webpack', 'modules', chunkId, 'chunkNames']))),
    modules: addRowData(mergeRunsById(
      map(jobs, (job) => get(job, ['metrics', 'webpack', 'modules', chunkId, 'modules'])),
    ), METRIC_TYPE_FILE_SIZE),
  }),
);

export const createReport = (jobs) => {
  const warnings = get(jobs, '[0].warnings');

  return {
    runs: jobs.map(({ internalBuildNumber, meta }) => ({
      ...meta,
      internalBuildNumber,
    })),

    // Add warnings if available
    ...!isEmpty(warnings) ? { warnings } : {},

    stats: addRowData(mergeRunsById(map(jobs, getWebpackStatsMetrics))),
    sizes: addRowData(mergeRunsById(map(jobs, getWebpackSizesMetrics))),
    assets: addRowData(mergeRunsById(map(jobs, 'metrics.webpack.assets')), METRIC_TYPE_FILE_SIZE),
    modules: getModulesReport(jobs),
    packages: addRowData(mergeRunsById(map(jobs, 'metrics.webpack.packages')), METRIC_TYPE_FILE_SIZE),
  };
};
