import { compose, withProps } from 'recompose';
import { get } from 'lodash';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';

import { withCustomSort } from '../../hocs/with-custom-sort';
import { withFilteredItems } from '../../hocs/with-filtered-items';
import { withSearch } from '../../hocs/with-search';
import {
  SORT_BY_NAME,
  SORT_BY_SIZE,
  SORT_BY_DELTA,
  SORT_BY,
  MODULE_FILTER_CHANGED,
  MODULE_FILTER_CHUNKS,
} from './bundle-modules.constants';

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
  if (filters[MODULE_FILTER_CHANGED] && !row.changed) {
    return row.changed;
  }

  // Filter by chunkId
  if(!get(row, 'runs[0].chunkIds', []).find((chunkId) => filters[`${MODULE_FILTER_CHUNKS}.${chunkId}`])) {
    return false;
  }

  return true;
};

const getChunksFilters = (chunks, value) => chunks.reduce((agg, { id }) => ({
  ...agg,
  [`${MODULE_FILTER_CHUNKS}.${id}`]: value,
}), {});

export default compose(
  withProps(({ jobs }) => {
    const items = webpack.compareBySection.allModules(jobs);
    const chunks = (jobs[0]?.rawData?.webpack.chunks || []).map(({ id, names }) => ({
      id,
      name: names.join(',') || `chunk-${id}`,
    }));

    const defaultFilters = {
      changed: jobs?.length > 1,
      ...getChunksFilters(chunks, true),
    };

    const initialFilters = {
      changed: jobs?.length > 1,
      ...getChunksFilters(chunks, true),
    };

    const allEntriesFilters = {
      changed: false,
      ...getChunksFilters(chunks, true),
    };

    return {
      defaultFilters,
      initialFilters,
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
