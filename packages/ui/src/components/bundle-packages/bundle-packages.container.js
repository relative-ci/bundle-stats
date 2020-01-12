import { compose, withProps } from 'recompose';
import { get, filter } from 'lodash';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';

import { withCustomSort } from '../../hocs/with-custom-sort';
import { withFilters } from '../../hocs/with-filters';
import {
  FILTER_CHANGED,
  FILTER_DUPLICATE,
  SORT_BY_NAME,
  SORT_BY_DELTA,
  SORT_BY_SIZE,
  SORT_BY,
} from './bundle-packages.constants';

const getRowFilter = (filters) => (item) => {
  if (filters[FILTER_CHANGED] && !item.changed) {
    return false;
  }

  if (filters[FILTER_DUPLICATE] && !item.duplicate) {
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

  return [
    !item.changed,
    item.key,
  ];
};

const addDuplicateTag = (items, duplicatePackages) => items.map((item) => ({
  ...item,
  duplicate: duplicatePackages.includes(item.key),
}));

export const enhance = compose(
  withProps(({ jobs }) => {
    const runs = jobs.map((job) => ({ meta: job }));
    const duplicatePackages = jobs.map((job) => get(job, 'warnings.webpack.duplicatePackages'));

    const items = addDuplicateTag(
      webpack.compare.packages(jobs),
      duplicatePackages,
    );

    return {
      runs,
      items,
    };
  }),

  withProps(({ runs }) => {
    const defaultFilters = { [FILTER_CHANGED]: false, [FILTER_DUPLICATE]: false };

    return {
      defaultFilters,
      initialFilters: {
        ...defaultFilters,
        // enable filter only when there are multiple jobs
        [FILTER_CHANGED]: runs && runs.length > 1,
      },
    };
  }),
  withFilters(),

  withProps(({ items, filters }) => ({
    totalRowCount: items.length,
    items: filter(items, getRowFilter(filters)),
  })),

  withCustomSort({
    sortItems: SORT_BY,
    getCustomSort,
    itemsKey: 'items',
    sortBy: SORT_BY_SIZE,
    direction: SORT_BY[SORT_BY_SIZE].defaultDirection,
  }),
);
