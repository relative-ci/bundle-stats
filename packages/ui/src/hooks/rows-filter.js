import { useMemo } from 'react';

export const useRowsFilter = ({ rows, searchPattern, filters, getRowFilter }) => {
  const filteredRows = useMemo(() => {
    const filterRow = getRowFilter(filters);
    return rows.filter((row) => {
      if (searchPattern && !searchPattern.test(row?.key)) {
        return false;
      }

      return filterRow(row);
    });
  }, [rows, searchPattern, filters, getRowFilter]);

  return filteredRows;
};
