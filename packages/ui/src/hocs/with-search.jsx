import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { debounce, isEqual, merge } from 'lodash';

const DEBOUNCE_DURATION = 300;

export const withSearch = () => (BaseComponent) => {
  const WithSearch = (props) => {
    const {
      allEntriesFilters,
      defaultFilters,
      emptyFilters,
      filters: customFilters,
      search: customSearch,
      setState,
    } = props;

    const initialFilters = customFilters ? merge({}, emptyFilters, customFilters) : defaultFilters;

    const [search, updateSearch] = useState(customSearch);
    const [searchPattern, setSearchPattern] = useState(new RegExp(customSearch));
    const [filters, updateFilters] = useState(merge({}, emptyFilters, initialFilters));

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

        if (setState) {
          setState({ search: newValue });
        }

        return setSearchPattern(newPattern);
      }, DEBOUNCE_DURATION),
    );

    const handleUpdateSearch = useRef((newValue) => {
      updateSearch(newValue);
      debouncedUpdateSearchPattern.current(newValue);
    });

    const handleUpdateFilters = (newFilters) => {
      if (setState) {
        setState({ filters: newFilters });
      }

      updateFilters(newFilters);
    };

    const handleResetFilters = useRef(() => {
      if (setState) {
        setState({ filters: defaultFilters, search: '' });
      } else {
        updateFilters(defaultFilters);
        updateSearch('');
      }
    });

    const hasActiveFilters = !isEqual(allEntriesFilters, filters);

    const baseProps = {
      search,
      searchPattern,
      filters,
      updateFilters: handleUpdateFilters,
      resetFilters: handleResetFilters.current,
      updateSearch: handleUpdateSearch.current,
      hasActiveFilters,
    };

    return <BaseComponent {...props} {...baseProps} />;
  };

  WithSearch.defaultProps = {
    filters: null,
    setState: null,
    search: '',
  };

  WithSearch.propTypes = {
    allEntriesFilters: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    emptyFilters: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    defaultFilters: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    filters: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    search: PropTypes.string,
    setState: PropTypes.func,
  };

  return WithSearch;
};
