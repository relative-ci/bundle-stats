import { useState, useMemo } from 'react';
import orderBy from 'lodash/orderBy';

export const useRowsSort = ({
  rows,
  sortFields,
  sortBy = 'size',
  sortDirection = 'desc',
  getCustomSort,
}) => {
  const [sort, updateSort] = useState({ field: sortBy, direction: sortDirection });

  const orderedRows = useMemo(
    () => orderBy(rows, getCustomSort(sort.field), sort.direction),
    [rows, sort],
  );

  return {
    sortFields,
    sort,
    updateSort,
    items: orderedRows,
  };
};
