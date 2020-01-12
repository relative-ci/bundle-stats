import {
  flatMap, get, map, uniq,
} from 'lodash';

import { METRIC_TYPE_FILE_SIZE } from '../config/metrics';
import { addRowData } from '../report/add-row-data';
import { mergeRunsById } from '../report/merge-runs-by-id';
import { compareMetrics } from '../report/compare-metrics';
import {
  SECTION_WEBPACK_ASSETS, SECTION_WEBPACK_MODULES, SECTION_WEBPACK_PACKAGES,
} from './constants';
import { selectors } from './selectors';

const compareAssets = (jobs) => compareMetrics(jobs, selectors.assets, METRIC_TYPE_FILE_SIZE);

const compareModules = (jobs) => {
  const jobsModuleMetrics = jobs.map(selectors.modules);
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

const comparePackages = (jobs) => compareMetrics(jobs, selectors.packages, METRIC_TYPE_FILE_SIZE);

export const compare = {
  [SECTION_WEBPACK_ASSETS]: compareAssets,
  [SECTION_WEBPACK_MODULES]: compareModules,
  [SECTION_WEBPACK_PACKAGES]: comparePackages,
};
