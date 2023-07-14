import { useState, useMemo } from 'react';
import get from 'lodash/get';
import orderBy from 'lodash/orderBy';

import type { SortAction } from '../types';
import { SORT } from '../constants';

interface UseRowsSortParams {
  rows: Array<unknown>;
  fieldPath: string;
  direction: SortAction['direction'];
  getCustomSort: (item: unknown) => Array<string | number | boolean>;
}

export const getSortFn =
  (fieldPath: string, getCustomSort: UseRowsSortParams['getCustomSort']) => (item: unknown) => {
    if (!fieldPath) {
      return getCustomSort(item);
    }

    return Math.abs(get(item, fieldPath) || 0);
  };

export const useRowsSort = ({
  rows,
  fieldPath = 'runs[0].delta',
  direction = 'desc',
  getCustomSort,
}: UseRowsSortParams) => {
  const [sort, updateSort] = useState({ field: fieldPath, direction });

  const orderedRows = useMemo(
    () =>
      orderBy(
        rows,
        getSortFn(sort.field, getCustomSort),
        // if direction is empty (reset), sort asc
        direction !== '' ? direction : (SORT.ASC as any),
      ),
    [rows, sort],
  );

  return {
    sort,
    updateSort,
    items: orderedRows,
  };
};
