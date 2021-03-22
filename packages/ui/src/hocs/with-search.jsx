import React, { useCallback, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { debounce, isEqual, merge } from 'lodash';

const DEBOUNCE_DURATION = 500;
const ACTION_SET_FILTERS = 'SET_FILTERS';
const ACTION_SET_SEARCH = 'SET_SEARCH';
const ACTION_SET_SEARCH_PATTERN = 'SET_SEARCH_PATTERN';
const ACTION_RESET_DEFAULT = 'RESET_DEFAULT';
const ACTION_RESET_ALL = 'RESET_ALL';
const ACTION_SET = 'SET';

const getSearchReducer = ({ defaultFilters, allEntriesFilters }) => (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_SET_FILTERS:
      return {
        ...state,
        filters: payload,
      };
    case ACTION_SET_SEARCH:
      return {
        ...state,
        search: payload,
      };
    case ACTION_SET_SEARCH_PATTERN:
      return {
        ...state,
        searchPattern: payload,
      };
    case ACTION_RESET_DEFAULT:
      return {
        filters: defaultFilters,
        search: '',
        searchPattern: '',
      };
    case ACTION_RESET_ALL:
      return {
        filters: allEntriesFilters,
        search: '',
        searchPattern: '',
      };
    case ACTION_SET:
      return payload;
    default:
      return state;
  }
};

export const generateState = (filters, search) => {
  let searchPattern = new RegExp(/.*/);

  try {
    searchPattern = new RegExp(search);
  } catch (err) {
    // noop
    console.error(err); // eslint-disable-line no-console
  }

  return {
    filters,
    search,
    searchPattern,
  };
};

export const useSearch = ({
  setState,
  search: customSearch,
  filters: customFilters,
  emptyFilters,
  defaultFilters,
  allEntriesFilters,
}) => {
  // When we pass custom filters, set the other flags to false (emptyFilters)
  const initialFilters = customFilters ? merge({}, emptyFilters, customFilters) : defaultFilters;

  const [{ search, searchPattern, filters }, dispatch] = useReducer(
    getSearchReducer({ defaultFilters, allEntriesFilters }),
    generateState(initialFilters, customSearch),
  );

  // Update state when the custom filters/search are changing
  useEffect(() => {
    dispatch({ type: ACTION_SET, payload: generateState(initialFilters, customSearch) });
  }, [customFilters, customSearch])

  const debouncedSearch = useCallback(
    debounce((newValue) => {
      let newPattern;

      if (!newValue.trim()) {
        return dispatch({ type: ACTION_SET_SEARCH_PATTERN, payload: '' });
      }

      try {
        newPattern = new RegExp(newValue);
      } catch (err) {
        // noop
        console.error(err); // eslint-disable-line no-console
      }

      if (setState) {
        setState({ search: newValue });
      }

      return dispatch({ type: ACTION_SET_SEARCH_PATTERN, payload: newPattern });
    }, DEBOUNCE_DURATION),
    [],
  );

  const handleUpdateSearch = useCallback((newValue) => {
    dispatch({ type: ACTION_SET_SEARCH, payload: newValue });
    debouncedSearch(newValue);
  }, []);

  const handleUpdateFilters = useCallback((newFilters) => {
    if (setState) {
      setState({ filters: newFilters });
    }

    dispatch({ type: ACTION_SET_FILTERS, payload: newFilters });
  }, []);

  const handleResetFilters = useCallback(() => {
    if (setState) {
      setState({ filters: defaultFilters, search: '' });
    } else {
      dispatch({ type: ACTION_RESET_DEFAULT });
    }
  }, [defaultFilters]);

  const handleResetAllFilters = useCallback(() => {
    if (setState) {
      setState({ filters: allEntriesFilters, search: '' });
    } else {
      dispatch({ type: ACTION_RESET_ALL });
    }
  }, [allEntriesFilters]);

  return {
    search,
    updateSearch: handleUpdateSearch,
    searchPattern,
    updateFilters: handleUpdateFilters,
    resetFilters: handleResetFilters,
    resetAllFilters: handleResetAllFilters,
    filters,
    hasActiveFilters: !isEqual(allEntriesFilters, filters),
  };
};

export const withSearch = () => (BaseComponent) => {
  const WithSearch = (props) => {
    const { allEntriesFilters, defaultFilters, emptyFilters, filters, search, setState } = props;
    const searchProps = useSearch({
      search,
      filters,
      setState,
      defaultFilters,
      emptyFilters,
      allEntriesFilters,
    });

    return <BaseComponent {...props} {...searchProps} />;
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
