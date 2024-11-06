import { useState, useMemo, useCallback } from 'react';
import get from 'lodash/get';
import orderBy from 'lodash/orderBy';

import type { SortAction } from '../types';
import { SORT } from '../constants';

export const getSortFn =
  <TRow>(fieldPath: string, getCustomSort: UseRowsSortParams<TRow>['getCustomSort']) =>
  (item: TRow) => {
    if (!fieldPath) {
      return getCustomSort(item);
    }

    return get(item, fieldPath) || 0;
  };

interface UseRowsSortParams<TRow> {
  rows: Array<TRow>;
  initialField?: string;
  initialDirection?: SortAction['direction'];
  getCustomSort: (item: any) => Array<string | number | boolean>;
  setQueryState: (queryParams: {
    sortBy: SortAction['field'];
    direction: SortAction['direction'];
  }) => void;
}

interface UseRowsSort<TRow> {
  items: Array<TRow>;
  sort: SortAction;
  updateSort: (params: SortAction) => void;
}

export const useRowsSort = <TRow>({
  rows,
  initialField = 'runs[0].delta',
  initialDirection = 'desc',
  getCustomSort,
  setQueryState,
}: UseRowsSortParams<TRow>): UseRowsSort<TRow> => {
  const [sort, setSort] = useState({ field: initialField, direction: initialDirection });

  const updateSort = useCallback(
    (newState: SortAction) => {
      // 1. Update local state
      setSort(newState);
      // 2. Update query state params
      setQueryState({ sortBy: newState.field, direction: newState.direction });
    },
    [setQueryState, setSort],
  );

  const orderedRows = useMemo(
    () =>
      orderBy(
      rows,
      getSortFn(sort.field, getCustomSort),
      // if direction is empty (reset), sort asc
      sort.direction !== '' ? sort.direction : (SORT.ASC as any),
    ),
    [rows, sort],
  );

  return {
    sort,
    updateSort,
    items: orderedRows,
  };
};
