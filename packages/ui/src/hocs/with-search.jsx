import React, { useCallback, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { isEqual, merge, noop } from 'lodash';

const ACTION_SET_FILTERS = 'SET_FILTERS';
const ACTION_SET_SEARCH = 'SET_SEARCH';
const ACTION_RESET_DEFAULT = 'RESET_DEFAULT';
const ACTION_RESET_ALL = 'RESET_ALL';
const ACTION_SET = 'SET';

const getSearchPattern = (search) => {
  let searchPattern = new RegExp(/.*/);

  if (!search || !search.trim()) {
    return searchPattern;
  }

  try {
    searchPattern = new RegExp(search, 'i');
  } catch (err) {
    // noop
    console.error(err); // eslint-disable-line no-console
  }

  return searchPattern;
};

const getSearchReducer = ({ defaultFilters, allEntriesFilters, setParentState = noop }) => (
  state, action,
) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_SET_FILTERS: {
      setParentState({
        filters: payload,
        search: state.search,
      });

      return {
        ...state,
        filters: payload,
      };
    }

    case ACTION_SET_SEARCH: {
      setParentState({
        filters: state.filters,
        search: payload,
      });

      return {
        ...state,
        search: payload,
        searchPattern: getSearchPattern(payload),
      };
    }

    case ACTION_RESET_DEFAULT: {
      setParentState({
        filters: defaultFilters,
        search: '',
      });

      return {
        filters: defaultFilters,
        search: '',
        searchPattern: getSearchPattern(),
      };
    }

    case ACTION_RESET_ALL: {
      setParentState({
        filters: allEntriesFilters,
        search: '',
      });

      return {
        filters: allEntriesFilters,
        search: '',
        searchPattern: getSearchPattern(),
      };
    }

    case ACTION_SET: {
      return payload;
    }

    default:
      return state;
  }
};

export const generateState = (filters, search) => ({
  filters,
  search,
  searchPattern: getSearchPattern(search),
});

export const useSearch = ({
  setState: setParentState,
  search: parentSearch,
  filters: parentFilters,
  defaultFilters,
  allEntriesFilters,
}) => {
  // When we pass custom filters, set the other flags to true(allEntries)
  const initialFilters = parentFilters
    ? merge({}, allEntriesFilters, parentFilters)
    : defaultFilters;

  const [{ search, searchPattern, filters }, dispatch] = useReducer(
    getSearchReducer({ defaultFilters, allEntriesFilters, setParentState }),
    generateState(initialFilters, parentSearch),
  );

  // Update state when the custom filters/search are changing - initial load or route updates
  useEffect(() => {
    // Run a deep comparison to prevent circular setState triggering
    if (parentSearch === search || isEqual(parentFilters, filters)) {
      return;
    }

    dispatch({ type: ACTION_SET, payload: generateState(initialFilters, parentSearch) });
  }, [search, filters, parentFilters, parentSearch]);

  const handleUpdateSearch = useCallback((newValue) => {
    dispatch({ type: ACTION_SET_SEARCH, payload: newValue });
  }, []);

  const handleUpdateFilters = useCallback((newFilters) => {
    dispatch({ type: ACTION_SET_FILTERS, payload: newFilters });
  }, []);

  const handleResetFilters = useCallback(() => {
    dispatch({ type: ACTION_RESET_DEFAULT });
  }, []);

  const handleResetAllFilters = useCallback(() => {
    dispatch({ type: ACTION_RESET_ALL });
  }, []);

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
    const { allEntriesFilters, defaultFilters, filters, search, setState } = props;
    const searchProps = useSearch({
      search,
      filters,
      setState,
      defaultFilters,
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
    defaultFilters: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    filters: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    search: PropTypes.string,
    setState: PropTypes.func,
  };

  return WithSearch;
};
