import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

export const withFilteredItems = (getFilter) => (BaseComponent) => {
  const WithFilteredItems = (props) => {
    const { items, filters, searchPattern } = props;

    const filteredItems = useMemo(
      () =>
        items.filter((item) => {
          if (searchPattern && !searchPattern.test(item?.key)) {
            return false;
          }

          return getFilter(filters)(item);
        }),
      [items, searchPattern, filters],
    );

    const baseProps = {
      items: filteredItems,
    };

    return <BaseComponent {...props} {...baseProps} />;
  };

  WithFilteredItems.propTypes = {
    filters: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    items: PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
    searchPattern: PropTypes.instanceOf(RegExp).isRequired,
  };

  return WithFilteredItems;
};
