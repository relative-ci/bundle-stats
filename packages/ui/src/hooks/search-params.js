import { useCallback, useLayoutEffect, useReducer } from 'react';
import { isEqual, merge } from 'lodash';

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

const getSearchReducer =
  ({ defaultFilters, allEntriesFilters, setParentState }) => (state, action) => {
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

export const useSearchParams = ({
  search: parentSearch,

  filters: parentFilters,
  defaultFilters,
  allEntriesFilters,
  setState: setParentState,
}) => {
  // When we pass custom filters, set the other flags to true (allEntries)
  const initialFilters = parentFilters
    ? merge({}, allEntriesFilters, parentFilters)
    : defaultFilters;

  const [{ search, searchPattern, filters }, dispatch] = useReducer(
    getSearchReducer({ defaultFilters, allEntriesFilters, setParentState }),
    generateState(initialFilters, parentSearch),
  );

  // Update state when the custom filters/search are changing - initial load or route updates
  useLayoutEffect(() => {
    // Run a deep comparison to prevent circular setState triggering
    if (parentSearch === search || isEqual(parentFilters, filters)) {
      return;
    }

    dispatch({ type: ACTION_SET, payload: generateState(initialFilters, parentSearch) });
  }, [search, filters, parentFilters, parentSearch]);

  /** Callbacks */
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
    searchPattern,
    filters,
    hasActiveFilters: !isEqual(allEntriesFilters, filters),
    updateSearch: handleUpdateSearch,
    updateFilters: handleUpdateFilters,
    resetFilters: handleResetFilters,
    resetAllFilters: handleResetAllFilters,
  };
};
