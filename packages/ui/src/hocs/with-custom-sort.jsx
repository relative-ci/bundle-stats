import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { orderBy } from 'lodash';

export const withCustomSort = ({
  sortItems,
  getCustomSort,
  sortBy = 'default',
  direction = 'asc',
}) => (BaseComponent) => {
  const WithCustomSort = (props) => {
    const { items } = props;
    const [sort, updateSort] = useState({ sortBy, direction });
    const orderedItems = orderBy(items, getCustomSort(sort.sortBy), sort.direction);

    const otherProps = {
      sort,
      updateSort,
      sortItems,
      items: orderedItems,
    };

    return <BaseComponent {...props} {...otherProps} />;
  };

  WithCustomSort.propTypes = {
    items: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  return WithCustomSort;
};
