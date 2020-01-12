import {
  flatMap, get, isEmpty, map, uniq,
} from 'lodash';

import { METRIC_TYPE_FILE_SIZE } from '../config';
import * as webpack from '../webpack';
import { mergeRunsById } from './merge-runs-by-id';
import { addRowData } from './add-row-data';

const compareMetrics = (jobs, selectMetrics, metricType) => {
  const data = map(jobs, selectMetrics);
  const rows = mergeRunsById(data);
  return rows.map((row) => addRowData(row, metricType));
};

export const getModulesReport = (jobs) => {
  const jobsModuleMetrics = jobs.map(webpack.selectors.modules);
  const allChunkIds = uniq(flatMap(
    jobsModuleMetrics, (jobModuleMetrics) => Object.keys(jobModuleMetrics),
  ));

  return allChunkIds.map((chunkId) => {
    const chunksJobs = map(jobsModuleMetrics, (job) => get(job, chunkId));
    const chunkNames = uniq(flatMap(chunksJobs, 'chunkNames'));

    return {
      chunkId,
      chunkNames,
      modules: mergeRunsById(map(chunksJobs, 'modules')).map((row) => addRowData(row, METRIC_TYPE_FILE_SIZE)),
    };
  });
};

export const createReport = (jobs) => {
  const warnings = get(jobs, '[0].warnings');

  return {
    runs: jobs.map(({ internalBuildNumber, meta }) => ({
      ...meta,
      internalBuildNumber,
    })),

    // Add warnings if available
    ...!isEmpty(warnings) ? { warnings } : {},

    stats: compareMetrics(jobs, webpack.selectors.stats),
    sizes: compareMetrics(jobs, webpack.selectors.sizes),
    assets: compareMetrics(jobs, webpack.selectors.assets, METRIC_TYPE_FILE_SIZE),
    modules: getModulesReport(jobs),
    packages: compareMetrics(jobs, webpack.selectors.packages, METRIC_TYPE_FILE_SIZE),
  };
};
