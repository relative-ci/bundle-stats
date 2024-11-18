import { useCallback, useLayoutEffect, useMemo, useReducer } from 'react';
import isEqual from 'lodash/isEqual';
import merge from 'lodash/merge';

const ACTION_SET_FILTERS = 'SET_FILTERS';
const ACTION_SET_SEARCH = 'SET_SEARCH';
const ACTION_RESET_DEFAULT = 'RESET_DEFAULT';
const ACTION_RESET_ALL = 'RESET_ALL';
const ACTION_SET = 'SET';

const SEARCH_DEFAULT = '';
const SEARCH_DEFAULT_PATTERN = /.*/;

const getSearchPattern = (search) => {
  let searchPattern = SEARCH_DEFAULT_PATTERN;

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
  ({ defaultFilters, allEntriesFilters, setParentState }) =>
  (state, action) => {
    const { type, payload } = action;

    switch (type) {
      case ACTION_SET_FILTERS: {
        const newState = {
          filters: payload,
          search: state.search,
          searchPattern: getSearchPattern(state.search),
        };
        setParentState(newState);
        return newState;
      }

      case ACTION_SET_SEARCH: {
        const newState = {
          filters: state.filters,
          search: payload,
        };

        setParentState(newState);

        return {
          ...newState,
          searchPattern: getSearchPattern(payload),
        };
      }

      case ACTION_RESET_DEFAULT: {
        const newState = {
          filters: defaultFilters,
          search: SEARCH_DEFAULT,
        };

        setParentState(newState);

        return {
          ...newState,
          searchPattern: getSearchPattern(),
        };
      }

      case ACTION_RESET_ALL: {
        const newState = {
          filters: allEntriesFilters,
          search: SEARCH_DEFAULT,
        };
        setParentState(newState);

        return {
          ...newState,
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
  search: parentSearch = SEARCH_DEFAULT,
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
    if (parentSearch === search && isEqual(initialFilters, filters)) {
      return;
    }

    dispatch({ type: ACTION_SET, payload: generateState(initialFilters, parentSearch) });
  }, [parentSearch, parentFilters]);

  /** Callbacks */
  const handleUpdateSearch = useCallback(
    (newValue) => {
      dispatch({ type: ACTION_SET_SEARCH, payload: newValue });
    },
    [dispatch],
  );

  const handleUpdateFilters = useCallback(
    (newFilters) => {
      dispatch({ type: ACTION_SET_FILTERS, payload: newFilters });
    },
    [dispatch],
  );

  const handleResetFilters = useCallback(() => {
    dispatch({ type: ACTION_RESET_DEFAULT });
  }, [dispatch]);

  const handleResetAllFilters = useCallback(() => {
    dispatch({ type: ACTION_RESET_ALL });
  }, [dispatch]);

  return useMemo(
    () => ({
      search,
      searchPattern,
      filters,
      hasActiveFilters: !isEqual(allEntriesFilters, filters),
      updateSearch: handleUpdateSearch,
      updateFilters: handleUpdateFilters,
      resetFilters: handleResetFilters,
      resetAllFilters: handleResetAllFilters,
    }),
    [
      search,
      searchPattern,
      filters,
      allEntriesFilters,
      handleUpdateSearch,
      handleUpdateFilters,
      handleResetFilters,
      handleResetAllFilters,
    ],
  );
};
