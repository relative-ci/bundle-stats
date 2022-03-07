import { useMemo } from 'react';
import { get, intersection, merge } from 'lodash';
import { MODULE_PATH_PACKAGES } from '@bundle-stats/utils/lib-esm/webpack';
import {
  MODULE_CHUNK,
  MODULE_FILTERS,
  MODULE_FILE_TYPE,
  MODULE_SOURCE_TYPE,
  getModuleSourceFileType,
} from '@bundle-stats/utils';

import { SORT_BY_NAME, SORT_BY_SIZE, SORT_BY_DELTA } from './bundle-modules.constants';

export const addRowSourceFlag = (row) => {
  const { key, runs } = row;
  const thirdParty = Boolean(key.match(MODULE_PATH_PACKAGES));
  const duplicated = Boolean(runs.find((run) => run?.duplicated === true));
  return { ...row, thirdParty, duplicated };
};

export const getCustomSort = (sortBy) => (item) => {
  if (sortBy === SORT_BY_NAME) {
    return item.key;
  }

  if (sortBy === SORT_BY_SIZE) {
    return get(item, 'runs[0].value', 0);
  }

  if (sortBy === SORT_BY_DELTA) {
    return get(item, 'runs[0].deltaPercentage', 0);
  }

  return [!item.changed, item.key];
};

export const getRowFilter = (filters) => (row) => {
  // Skip not changed rows
  if (filters[MODULE_FILTERS.CHANGED] && !row.changed) {
    return false;
  }

  // Skip not duplicated rows
  if (filters[MODULE_FILTERS.DUPLICATED] && !row.duplicated) {
    return false;
  }

  // Skip not matching source type
  if (
    !(
      (filters[`${MODULE_SOURCE_TYPE}.${MODULE_FILTERS.FIRST_PARTY}`] &&
        row.thirdParty === false) ||
      (filters[`${MODULE_SOURCE_TYPE}.${MODULE_FILTERS.THIRD_PARTY}`] && row.thirdParty === true)
    )
  ) {
    return false;
  }

  // Skip not matching source file types
  const fileType = getModuleSourceFileType(row.key);
  if (!filters[`${MODULE_FILE_TYPE}.${fileType}`]) {
    return false;
  }

  return true;
};

export const useModuleFilterByChunk = ({ jobs, filters, chunkIds }) => {
  const filteredJobs = useMemo(() => {
    // List of chunkIds with filter value set to `true`
    const includedChunkIds = chunkIds.reduce((agg, chunkId) => {
      if (get(filters, `${MODULE_CHUNK}.${chunkId}`)) {
        return [...agg, chunkId];
      }

      return agg;
    }, []);

    // If all the filters are included, return jobs as they are
    if (includedChunkIds.length === chunkIds.length) {
      return jobs;
    }

    const jobsWithFilteredData = jobs.map((job) => {
      const { modules } = job?.metrics?.webpack || {};

      const filteredModules = Object.entries(modules).reduce((agg, [moduleId, moduleEntry]) => {
        const match = intersection(moduleEntry.chunkIds, includedChunkIds);

        if (match.length > 0) {
          agg[moduleId] = moduleEntry; // eslint-disable-line no-param-reassign
        }

        return agg;
      }, {});

      // Copy job data into a new object to prevent mutations of the original data
      const newJob = merge({}, job);
      newJob.metrics.webpack.modules = filteredModules;

      return newJob;
    });

    return jobsWithFilteredData;
  }, [jobs, filters, chunkIds]);

  return filteredJobs;
};
