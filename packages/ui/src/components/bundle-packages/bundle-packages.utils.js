import uniq from 'lodash/uniq';
import { PACKAGE_FILTERS } from '@bundle-stats/utils';

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

export const getCustomSort = (item) => [!item.changed, item.key];

export const getAddRowDuplicateFlag = (duplicateJobs) => (row) => ({
  ...row,
  duplicate: duplicateJobs.includes(row.key),
});
