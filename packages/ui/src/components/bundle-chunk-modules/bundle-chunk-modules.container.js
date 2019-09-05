import {
  compose, withProps, withState,
} from 'recompose';
import { get, orderBy } from 'lodash';

import {
  ORDER_BY_NAME,
  ORDER_BY_SIZE,
  ORDER_BY_DELTA,
  ORDER_BY,
} from './bundle-chunk-modules.constants';

const getCustomOrder = (sortBy) => (item) => {
  if (sortBy === ORDER_BY_NAME) {
    return item.key;
  }

  if (sortBy === ORDER_BY_SIZE) {
    return [
      get(item, 'runs[0].value', 0),
      item.key,
    ];
  }

  if (sortBy === ORDER_BY_DELTA) {
    return [
      get(item, 'runs[0].delta', 0),
      item.key,
    ];
  }

  return [!item.changed, item.key];
};

const getFilterByChanged = (filters) => (row) => {
  if (filters.changed) {
    return row.changed;
  }

  return true;
};

export default compose(
  withState('filters', 'updateFilters', ({ runs }) => ({
    changed: runs && runs.length > 1,
  })),
  withProps(({ modules, filters }) => ({
    totalRowsCount: modules.length,
    modules: modules.filter(getFilterByChanged(filters)),
  })),
  // sorting
  withProps({ sortItems: ORDER_BY }),
  withState('sort', 'updateSort', { sortBy: 'default', direction: 'asc' }),
  withProps(({ modules, sort }) => ({
    modules: orderBy(modules, getCustomOrder(sort.sortBy), sort.direction),
  })),
);
