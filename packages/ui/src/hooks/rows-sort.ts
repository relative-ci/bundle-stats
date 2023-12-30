import { useState, useMemo } from 'react';
import get from 'lodash/get';
import orderBy from 'lodash/orderBy';

import type { SortAction } from '../types';
import { SORT } from '../constants';

interface UseRowsSortParams {
  rows: Array<unknown>;
  initialField?: string;
  initialDirection?: SortAction['direction'];
  getCustomSort: (item: any) => Array<string | number | boolean>;
}

export const getSortFn =
  (fieldPath: string, getCustomSort: UseRowsSortParams['getCustomSort']) => (item: unknown) => {
    if (!fieldPath) {
      return getCustomSort(item);
    }

    return get(item, fieldPath) || 0;
  };

export const useRowsSort = ({
  rows,
  initialField = 'runs[0].delta',
  initialDirection = 'desc',
  getCustomSort,
}: UseRowsSortParams) => {
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
