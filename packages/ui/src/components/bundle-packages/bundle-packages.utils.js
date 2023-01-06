import uniq from 'lodash/uniq';
import { PACKAGE_FILTERS } from '@bundle-stats/utils';

import { SORT_BY_NAME, SORT_BY_DELTA, SORT_BY_SIZE } from './bundle-packages.constants';

// Get a list of duplicate packages across jobs
export const getDuplicatePackages = (jobs) => {
  const jobsDuplicatePackages = jobs.map((job) => {
    const insightsData = job?.insights?.webpack?.duplicatePackages?.data || {};
    return Object.values(insightsData).flat();
  });

  return uniq(jobsDuplicatePackages?.flat());
};

export const getRowFilter = (filters) => (item) => {
  if (filters[PACKAGE_FILTERS.CHANGED] && !item.changed) {
    return false;
  }

  if (filters[PACKAGE_FILTERS.DUPLICATE] && !item.duplicate) {
    return false;
  }

  return true;
};

export const getCustomSort = (sortId) => (item) => {
  if (sortId === SORT_BY_NAME) {
    return item.key;
  }

  if (sortId === SORT_BY_DELTA) {
    return item?.runs?.[0]?.delta || 0;
  }

  if (sortId === SORT_BY_SIZE) {
    return item?.runs?.[0]?.value || 0;
  }

  return [!item.changed, item.key];
};

export const getAddRowDuplicateFlag = (duplicateJobs) => (row) => ({
  ...row,
  duplicate: duplicateJobs.includes(row.key),
});
