import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { debounce, merge } from 'lodash';

const DEBOUNCE_DURATION = 300;

export const withSearch = () => (BaseComponent) => {
  const WithSearch = (props) => {
    const { defaultFilters, emptyFilters, filters: customFilters } = props;
    const initialFilters = customFilters ? merge({}, emptyFilters, customFilters) : defaultFilters;

    const [search, updateSearch] = useState('');
    const [searchPattern, setSearchPattern] = useState();
    const [filters, updateFilters] = useState(initialFilters);

    const debouncedUpdateSearchPattern = useRef(
      debounce((newValue) => {
        let newPattern;

        if (!newValue.trim()) {
          return setSearchPattern();
        }

        try {
          newPattern = new RegExp(newValue);
        } catch (error) {
          // skip
        }

        return setSearchPattern(newPattern);
      }, DEBOUNCE_DURATION),
    );

    const handleUpdateSearch = useRef((newValue) => {
      updateSearch(newValue);
      debouncedUpdateSearchPattern.current(newValue);
    });

    const handleResetFilters = useRef(() => updateFilters(defaultFilters));

    const baseProps = {
      search,
      searchPattern,
      filters,
      updateFilters,
      resetFilters: handleResetFilters.current,
      updateSearch: handleUpdateSearch.current,
    };

    return <BaseComponent {...props} {...baseProps} />;
  };

  WithSearch.defaultProps = {
    filters: null,
  };

  WithSearch.propTypes = {
    emptyFilters: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    defaultFilters: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    filters: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  };

  return WithSearch;
};
