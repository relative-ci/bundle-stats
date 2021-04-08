import flatMap from 'lodash/flatMap';
import map from 'lodash/map';
import merge from 'lodash/merge';
import uniq from 'lodash/uniq';

import { METRIC_TYPE_FILE_SIZE } from '../config/metrics';
import { addRowData } from '../report/add-row-data';
import { mergeMetricsByKey } from '../report/merge-metrics-by-key';
import { compareMetrics } from '../report/compare-metrics';
import {
  SECTION_WEBPACK_STATS,
  SECTION_WEBPACK_SIZES,
  SECTION_WEBPACK_ASSETS,
  SECTION_WEBPACK_MODULES,
  SECTION_WEBPACK_PACKAGES,
  SECTIONS,
  SECTION_WEBPACK_ALL_MODULES,
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
 * @return {Object[]} Compared module metrics by chunk id
 */
const compareModules = (jobs) => {
  const jobsModuleMetrics = jobs.map(selectors.modules);
  const allChunkIds = uniq(flatMap(
    jobsModuleMetrics, (jobModuleMetrics) => Object.keys(jobModuleMetrics),
  ));

  return allChunkIds.map((chunkId) => {
    const jobsChunk = map(jobsModuleMetrics, chunkId);
    const chunkNames = uniq(flatMap(jobsChunk, 'chunkNames'));
    const modules = mergeMetricsByKey(map(jobsChunk, 'modules')).map(
      (row) => addRowData(row, METRIC_TYPE_FILE_SIZE),
    );

    return { chunkId, chunkNames, modules };
  });
};

/**
 * Compare all modules
 *
 * @param {Object[]} jobs - List of jobs to compare
 * @return {Object[]} Compared module metrics
 */
const compareAllModules = (jobs) => {
  const jobsWithAllModules = jobs.map((job) => {
    const modulesByChunkId = selectors.modules(job);

    const allModules = Object.entries(modulesByChunkId).reduce((agg, [chunkId, { modules }]) => {
      // Aggregate chunk modules
      const processedModules = Object.entries(modules).reduce(
        (chunkAgg, [moduleName, moduleData]) => {
          const existingModule = chunkAgg[moduleName];

          // @NOTE immutable methods will decrease the perfomace by more than 3x
          // eslint-disable-next-line no-param-reassign
          chunkAgg[moduleName] = {
            ...existingModule,
            ...moduleData,
            chunkIds: [...(existingModule?.chunkIds || []), chunkId],
          };

          return chunkAgg;
        },
        agg,
      );

      return processedModules;
    }, {});

    return merge({}, job, {
      metrics: {
        webpack: {
          allModules,
        },
      },
    });
  });

  return compareMetrics(jobsWithAllModules, selectors.allModules, METRIC_TYPE_FILE_SIZE);
};

/**
 * Compare package metrics
 *
 * @param {Object[]} jobs - List of jobs to compare
 *
 * @return {Object[]} Compared package metrics
 */
const comparePackages = (jobs) => compareMetrics(jobs, selectors.packages, METRIC_TYPE_FILE_SIZE);

export const compareBySection = {
  [SECTION_WEBPACK_STATS]: compareStats,
  [SECTION_WEBPACK_SIZES]: compareSizes,
  [SECTION_WEBPACK_ASSETS]: compareAssets,
  [SECTION_WEBPACK_MODULES]: compareModules,
  [SECTION_WEBPACK_ALL_MODULES]: compareAllModules,
  [SECTION_WEBPACK_PACKAGES]: comparePackages,
};

/**
 * Compare webpack sections
 *
 * @param {Object[]} jobs - List of jobs to compare
 * @return {Object} Compared metrics by section
 */
export const compare = (jobs) => SECTIONS.reduce((agg, sectionId) => ({
  ...agg,
  [sectionId]: compareBySection[sectionId](jobs),
}), {});
