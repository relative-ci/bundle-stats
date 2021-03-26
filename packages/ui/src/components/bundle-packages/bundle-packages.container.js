import { useMemo } from 'react';
import { compose, withProps } from 'recompose';
import { get } from 'lodash';
import { PACKAGE_FILTERS } from '@bundle-stats/utils';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';

import { withCustomSort } from '../../hocs/with-custom-sort';
import { withFilteredItems } from '../../hocs/with-filtered-items';
import { withSearch } from '../../hocs/with-search';
import {
  SORT_BY_NAME,
  SORT_BY_DELTA,
  SORT_BY_SIZE,
  SORT_BY,
} from './bundle-packages.constants';

const getRowFilter = (filters) => (item) => {
  if (filters[PACKAGE_FILTERS.CHANGED] && !item.changed) {
    return false;
  }

  if (filters[PACKAGE_FILTERS.DUPLICATE] && !item.duplicate) {
    return false;
  }

  return true;
};

const getCustomSort = (sortId) => (item) => {
  if (sortId === SORT_BY_NAME) {
    return item.key;
  }

  if (sortId === SORT_BY_DELTA) {
    return get(item, 'runs[0].deltaPercentage', 0);
  }

  if (sortId === SORT_BY_SIZE) {
    return get(item, 'runs[0].value', 0);
  }

  return [!item.changed, item.key];
};

const addDuplicateTag = (items, duplicatePackages) =>
  items.map((item) => ({
    ...item,
    duplicate: duplicatePackages.includes(item.key),
  }));

export const enhance = compose(
  withProps(({ jobs }) => {
    const duplicatePackages = Object.values(
      get(jobs, '0.insights.webpack.duplicatePackages.data', {}),
    ).flat();

    const items = useMemo(
      () => addDuplicateTag(webpack.compareBySection.packages(jobs), duplicatePackages),
      [jobs, duplicatePackages],
    );

    const defaultFilters = {
      [PACKAGE_FILTERS.CHANGED]: jobs?.length > 1,
      [PACKAGE_FILTERS.DUPLICATE]: false,
    };
    const allEntriesFilters = {
      [PACKAGE_FILTERS.CHANGED]: false,
      [PACKAGE_FILTERS.DUPLICATE]: false,
    };

    return {
      totalRowCount: items.length,
      items,
      defaultFilters,
      allEntriesFilters,
    };
  }),

  withSearch(),
  withFilteredItems(getRowFilter),

  withCustomSort({
    sortItems: SORT_BY,
    getCustomSort,
    sortBy: SORT_BY_SIZE,
    direction: SORT_BY[SORT_BY_SIZE].defaultDirection,
  }),
);
