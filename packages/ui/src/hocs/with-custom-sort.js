import { orderBy } from 'lodash';
import { compose, withProps, withState } from 'recompose';

export const withCustomSort = ({
  sortItems, getCustomSort, itemsKey, sortBy = 'default', direction = 'asc',
}) => compose(
  withProps({ sortItems }),
  withState('sort', 'updateSort', { sortBy, direction }),
  withProps(({ sort, ...restProps }) => ({
    [itemsKey]: orderBy(restProps[itemsKey], getCustomSort(sort.sortBy), sort.direction),
  })),
);
