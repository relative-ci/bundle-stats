import { useMemo } from 'react';
import { compose, withProps } from 'recompose';
import { get, map } from 'lodash';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';
import {
  MODULE_CHUNK,
  MODULE_FILTERS,
  MODULE_FILE_TYPE,
  getModuleChunkFilters,
  getModuleFileTypeFilters,
  getModuleSourceFileType,
} from '@bundle-stats/utils';

import { withCustomSort } from '../../hocs/with-custom-sort';
import { withFilteredItems } from '../../hocs/with-filtered-items';
import { withSearch } from '../../hocs/with-search';
import { SORT_BY_NAME, SORT_BY_SIZE, SORT_BY_DELTA, SORT_BY } from './bundle-modules.constants';

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

  // Skip not matching chunks
  if (!get(row, 'runs[0].chunkIds', []).find((chunkId) => filters[`${MODULE_CHUNK}.${chunkId}`])) {
    return false;
  }

  // Skip not matching source types
  const fileType = getModuleSourceFileType(row.key);
  if (!filters[`${MODULE_FILE_TYPE}.${fileType}`]) {
    return false;
  }

  return true;
};

export default compose(
  withProps(({ jobs }) => {
    const items = useMemo(() => webpack.compareBySection.allModules(jobs), [jobs]);

    const chunks = jobs[0]?.meta?.webpack?.chunks || []
    const chunkIds = map(chunks, 'id');

    const defaultFilters = {
      changed: jobs?.length > 1,
      ...getModuleChunkFilters(chunkIds, true),
      ...getModuleFileTypeFilters(true),
    };

    const allEntriesFilters = {
      changed: false,
      ...getModuleChunkFilters(chunkIds, true),
      ...getModuleFileTypeFilters(true),
    };

    return {
      defaultFilters,
      allEntriesFilters,
      totalRowCount: items.length,
      items,
      chunks,
    };
  }),
  withSearch(),
  withFilteredItems(getRowFilter),
  withCustomSort({ sortItems: SORT_BY, getCustomSort }),
);
