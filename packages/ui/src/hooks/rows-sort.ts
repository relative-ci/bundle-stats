import { useState, useMemo } from 'react';
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
}: UseRowsSortParams<TRow>): UseRowsSort<TRow> => {
  const [sort, updateSort] = useState({ field: initialField, direction: initialDirection });

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
