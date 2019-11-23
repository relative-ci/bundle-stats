import {
  flatMap, get, isEmpty, map, pick, uniq,
} from 'lodash';

import { METRIC_TYPE_FILE_SIZE } from '../config';
import * as webpack from '../webpack';
import { getMetricChanged, getMetricType, mergeRunsById } from '../metrics';
import { getDelta, formatDelta } from './delta';
import { formatPercentage } from './format';

export const addMetricsData = (entries, metricType, metricPrefix = '') => entries.map((entry) => {
  const { runs } = entry;
  const { biggerIsBetter, label, formatter } = getMetricType(
    metricPrefix ? [metricPrefix, entry.key].join('.') : entry.key,
    metricType,
  );

  return {
    ...entry,

    // Metric props
    biggerIsBetter,
    label,

    // Row props
    changed: getMetricChanged(runs),

    // Runs
    runs: runs.map((run, index) => {
      if (!run || typeof run.value === 'undefined' || run.value === null) {
        return null;
      }

      const { value, ...restRun } = run;
      const diff = (index < runs.length - 1) ? getDelta(runs[index + 1], run) : null;

      return {
        ...restRun,

        // run data
        value,
        displayValue: formatter(run.value),

        // diff data
        ...(diff !== null) ? {
          ...diff,
          displayDelta: formatDelta(diff.delta, formatter),
          displayDeltaPercentage: formatDelta(diff.deltaPercentage, formatPercentage),
        } : {},
      };
    }),
  };
});

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
    modules: addMetricsData(mergeRunsById(
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
    ...!isEmpty(warnings) ? { warnings } : {},
    stats: addMetricsData(mergeRunsById(map(jobs, getWebpackStatsMetrics))),
    sizes: addMetricsData(mergeRunsById(map(jobs, getWebpackSizesMetrics))),
    assets: addMetricsData(mergeRunsById(map(jobs, 'metrics.webpack.assets')), METRIC_TYPE_FILE_SIZE),
    modules: getModulesReport(jobs),
    packages: addMetricsData(mergeRunsById(map(jobs, 'metrics.webpack.packages')), METRIC_TYPE_FILE_SIZE),
  };
};
