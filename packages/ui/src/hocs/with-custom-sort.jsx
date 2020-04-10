import React, { useState } from 'react';
import { orderBy } from 'lodash';

export const withCustomSort = ({
  sortItems,
  getCustomSort,
  itemsKey,
  sortBy = 'default',
  direction = 'asc',
}) => (BaseComponent) => {
  const WithCustomSort = (props) => {
    const { [itemsKey]: items } = props;
    const [sort, updateSort] = useState({ sortBy, direction });
    const orderedItems = orderBy(items, getCustomSort(sort.sortBy), sort.direction);

    const otherProps = {
      sort,
      updateSort,
      sortItems,
      [itemsKey]: orderedItems,
    };

    return <BaseComponent {...props} {...otherProps} />;
  };

  return WithCustomSort;
};
