import { flatMap, map, uniq } from 'lodash';

import { METRIC_TYPE_FILE_SIZE } from '../config/metrics';
import { addRowData } from '../report/add-row-data';
import { mergeRunsById } from '../report/merge-runs-by-id';
import { compareMetrics } from '../report/compare-metrics';
import {
  SECTION_WEBPACK_STATS,
  SECTION_WEBPACK_SIZES,
  SECTION_WEBPACK_ASSETS,
  SECTION_WEBPACK_MODULES,
  SECTION_WEBPACK_PACKAGES,
} from './constants';
import { selectors } from './selectors';

/**
 * Compare stats metrics
 *
 * @param {Object[]} jobs - List of jobs to compare
 *
 * @return {Object[]} Compared stats metrics
 */
const compareStats = (jobs) => compareMetrics(jobs, selectors.stats);

/**
 * Compare size metrics
 *
 * @param {Object[]} jobs - List of jobs to compare
 *
 * @return {Object[]} Compared size metrics
 */
const compareSizes = (jobs) => compareMetrics(jobs, selectors.sizes);

/**
 * Compare asset metrics
 *
 * @param {Object[]} jobs - List of jobs to compare
 *
 * @return {Object[]} Compared asset metrics
 */
const compareAssets = (jobs) => compareMetrics(jobs, selectors.assets, METRIC_TYPE_FILE_SIZE);

/**
 * Compare modules
 *
 * @param {Object[]} jobs - List of jobs to compare
 *
 * @return {Object[]} Compared module metrics by chunk Id
 */
const compareModules = (jobs) => {
  const jobsModuleMetrics = jobs.map(selectors.modules);
  const allChunkIds = uniq(flatMap(
    jobsModuleMetrics, (jobModuleMetrics) => Object.keys(jobModuleMetrics),
  ));

  return allChunkIds.map((chunkId) => {
    const jobsChunk = map(jobsModuleMetrics, chunkId);
    const chunkNames = uniq(flatMap(jobsChunk, 'chunkNames'));
    const modules = mergeRunsById(map(jobsChunk, 'modules')).map(
      (row) => addRowData(row, METRIC_TYPE_FILE_SIZE),
    );

    return { chunkId, chunkNames, modules };
  });
};

/**
 * Compare package metrics
 *
 * @param {Object[]} jobs - List of jobs to compare
 *
 * @return {Object[]} Compared package metrics
 */
const comparePackages = (jobs) => compareMetrics(jobs, selectors.packages, METRIC_TYPE_FILE_SIZE);

export const compare = {
  [SECTION_WEBPACK_STATS]: compareStats,
  [SECTION_WEBPACK_SIZES]: compareSizes,
  [SECTION_WEBPACK_ASSETS]: compareAssets,
  [SECTION_WEBPACK_MODULES]: compareModules,
  [SECTION_WEBPACK_PACKAGES]: comparePackages,
};
