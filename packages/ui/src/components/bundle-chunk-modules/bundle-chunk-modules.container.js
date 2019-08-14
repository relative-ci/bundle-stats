import {
  compose, withProps, withState,
} from 'recompose';
import { sortBy } from 'lodash';

const customSort = (item) => [!item.changed, item.key];

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
    modules: sortBy(modules.filter(getFilterByChanged(filters)), customSort),
  })),
);
