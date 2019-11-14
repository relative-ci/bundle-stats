import {
  compose, withProps, withState,
} from 'recompose';
import { get } from 'lodash';

import { withCustomSort } from '../../hocs/with-custom-sort';
import {
  SORT_BY_NAME,
  SORT_BY_SIZE,
  SORT_BY_DELTA,
  SORT_BY,
} from './bundle-chunk-modules.constants';

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
    totalRowCount: modules.length,
    modules: modules.filter(getFilterByChanged(filters)),
  })),
  withCustomSort({ sortItems: SORT_BY, getCustomSort, itemsKey: 'modules' }),
);
