import { useCallback, useLayoutEffect, useMemo, useReducer } from 'react';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';

const ACTION_SET_FILTERS = 'SET_FILTERS';
const ACTION_SET_SEARCH = 'SET_SEARCH';
const ACTION_RESET_DEFAULT = 'RESET_DEFAULT';
const ACTION_RESET_ALL = 'RESET_ALL';
const ACTION_UPDATE_LOCAL = 'UPDATE_LOCAL';

const SEARCH_DEFAULT = '';
const SEARCH_DEFAULT_PATTERN = /.*/;

/**
 * Get the differences between the custom and default filters
 */
const filterChanges = (defaultFilters = {}, customFilters = {}) => {
  const filters = {};

  Object.entries(customFilters).forEach(([key, value]) => {
    if (defaultFilters[key] !== value) {
      filters[key] = value;
    }
  });

  if (isEmpty(filters)) {
    return undefined;
  }

  return filters;
};

/**
 * Check if there are any custom filter changes
 */
const hasFilterChanges = (defaultFilters = {}, customFilters = {}) => {
  const filterEntries = Object.entries(customFilters);
  let diff = false;

  // eslint-disable-next-line no-plusplus
  for (let i = 0 && !diff; i < filterEntries.length; i++) {
    const [key, value] = filterEntries[i];

    if (defaultFilters[key] !== value) {
      diff = true;
    }
  }

  return diff;
};

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
        };

        const newParentState = {
          filters: filterChanges(allEntriesFilters, payload),
          search: state.search,
        };

        setParentState(newParentState);

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

      /**
       * Update local state and do not trigger a parent state change
       */
      case ACTION_UPDATE_LOCAL: {
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
  useLayoutEffect(
    () => {
      const searchChanged = parentSearch !== search;
      const filtersChanged = hasFilterChanges(filters, parentFilters);

      // Skip when there are no changes
      if (!searchChanged && !filtersChanged) {
        return;
      }

      // Update search & filters
      dispatch({ type: ACTION_UPDATE_LOCAL, payload: generateState(initialFilters, parentSearch) });
    },
    // Run only when parent props are changing
    [parentSearch, parentFilters],
  );

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
