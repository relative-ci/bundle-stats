import { orderBy } from 'lodash';
import { compose, withProps, withState } from 'recompose';

export const withCustomSort = ({ sortItems, getCustomSort, itemsKey }) => compose(
  withProps({ sortItems }),
  withState('sort', 'updateSort', { sortBy: 'default', direction: 'asc' }),
  withProps(({ sort, ...restProps }) => ({
    [itemsKey]: orderBy(restProps[itemsKey], getCustomSort(sort.sortBy), sort.direction),
  })),
);
