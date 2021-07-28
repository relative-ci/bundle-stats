import { useMemo } from 'react';
import { compose, withProps } from 'recompose';
import { get, map, max, merge, intersection, uniqBy } from 'lodash';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';
import {
  MODULE_CHUNK,
  MODULE_FILTERS,
  MODULE_FILE_TYPE,
  MODULE_SOURCE_TYPE,
  getModuleChunkFilters,
  getModuleSourceTypeFilters,
  getModuleFileTypeFilters,
  getModuleSourceFileType,
} from '@bundle-stats/utils';

import { withCustomSort } from '../../hocs/with-custom-sort';
import { withFilteredItems } from '../../hocs/with-filtered-items';
import { withSearch } from '../../hocs/with-search';
import { SORT_BY_NAME, SORT_BY_SIZE, SORT_BY_DELTA, SORT_BY } from './bundle-modules.constants';

const addRowSourceFlag = (row) => {
  const { key } = row;
  const thirdParty = Boolean(key.match(webpack.MODULE_PATH_PACKAGES));
  return { ...row, thirdParty };
};

const getCustomSort = (sortBy) => (item) => {
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

const getRowFilter = (filters) => (row) => {
  // Skip not changed rows
  if (filters[MODULE_FILTERS.CHANGED] && !row.changed) {
    return false;
  }

  // Skip not matching source type
  if (
    !(
      (filters[`${MODULE_SOURCE_TYPE}.${MODULE_FILTERS.FIRST_PARTY}`] && row.thirdParty === false) ||
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

export default compose(
  withProps((props) => {
    const { jobs } = props;
    const chunks = uniqBy(
      jobs.map((job) => job?.meta?.webpack?.chunks || []).flat(),
      ({ id }) => id,
    );
    const chunkIds = map(chunks, 'id');

    const defaultFilters = {
      changed: jobs?.length > 1,
      ...getModuleSourceTypeFilters(true),
      ...getModuleChunkFilters(chunkIds, true),
      ...getModuleFileTypeFilters(true),
    };

    const allEntriesFilters = {
      changed: false,
      ...getModuleSourceTypeFilters(true),
      ...getModuleChunkFilters(chunkIds, true),
      ...getModuleFileTypeFilters(true),
    };

    return {
      defaultFilters,
      allEntriesFilters,
      chunks,
      chunkIds,
    };
  }),
  withSearch(),
  withProps((props) => {
    const { jobs, chunkIds, filters } = props;

    // List of chunkIds with filter value set to `true`
    const includedChunkIds = chunkIds.reduce((agg, chunkId) => {
      if (get(filters, `${MODULE_CHUNK}.${chunkId}`)) {
        return [...agg, chunkId];
      }
      return agg;
    }, []);

    // If all the filters are included, return jobs as they are
    if (includedChunkIds.length === chunkIds.length) {
      return { jobs };
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

    return { jobs: jobsWithFilteredData };
  }),
  withProps(({ jobs }) => {
    const { items, totalRowCount } = useMemo(
      () => ({
        items: webpack.compareBySection.modules(jobs, [addRowSourceFlag]),
        /*
         * total amount of rows depends on the way the modules are merged before any filtering.
         * to avoid running an expensive operation before filtering, we just show the total amount of
         * rows to be the max count between different runs
         */
        totalRowCount: max(jobs.map((job) => Object.values(job?.metrics?.webpack?.modules || {}).length)),
      }),
      [jobs],
    );

    return {
      totalRowCount,
      items,
    };
  }),
  withFilteredItems(getRowFilter),
  withCustomSort({ sortItems: SORT_BY, getCustomSort }),
);
