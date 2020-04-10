import React from 'react';
import PropTypes from 'prop-types';

export const withFilteredItems = (collection = 'items', getFilter) => (BaseComponent) => {
  const WithFilteredItems = (props) => {
    const { [collection]: items, filters, searchPattern } = props;

    const filteredItems = items.filter((item) => {
      if (searchPattern && !searchPattern.test(item?.key)) {
        return false;
      }

      return getFilter(filters)(item);
    });

    const baseProps = {
      [collection]: filteredItems,
    };

    return <BaseComponent {...props} {...baseProps} />;
  };

  WithFilteredItems.propTypes = {
    filters: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    searchPattern: PropTypes.instanceOf(RegExp).isRequired,
  };

  return WithFilteredItems;
};
