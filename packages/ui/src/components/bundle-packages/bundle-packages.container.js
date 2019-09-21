import {
  compose, withProps, withState,
} from 'recompose';
import { get, filter } from 'lodash';
import {
  METRIC_TYPE_FILE_SIZE,
  addMetricsData,
  modulesWebpackTransform,
  packagesModulesBundleTransform,
  mergeRunsById,
} from '@bundle-stats/utils';

import { withCustomSort } from '../../hocs/with-custom-sort';
import {
  FILTER_CHANGED,
  SORT_BY_NAME,
  SORT_BY_DELTA,
  SORT_BY_SIZE,
  SORT_BY,
} from './bundle-packages.constants';

const getRowFilter = (filters) => (item) => {
  if (filters[FILTER_CHANGED] && !item.changed) {
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

export const enhance = compose(
  withProps(({ jobs }) => {
    const runs = jobs.map((job) => ({ meta: job }));
    const jobsPackages = jobs.map((job) => {
      const bundle = modulesWebpackTransform(get(job, 'rawData.webpack.stats'));
      const res = packagesModulesBundleTransform(bundle);
      return res.packages;
    });

    const items = addMetricsData(mergeRunsById(jobsPackages), METRIC_TYPE_FILE_SIZE);

    return {
      runs,
      items,
    };
  }),

  withState('filters', 'updateFilters', ({ jobs }) => ({
    [FILTER_CHANGED]: jobs.length > 1, // enable filter only when there are multiple jobs
  })),

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
