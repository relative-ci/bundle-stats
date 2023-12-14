import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';

import { useRowsFilter } from '../../hooks/rows-filter';
import { useRowsSort } from '../../hooks/rows-sort';
import { useSearchParams } from '../../hooks/search-params';
import { BundleModules as BundleModulesComponent } from './bundle-modules';
import {
  addRowFlags,
  extractChunkData,
  generateGetRowFilter,
  generateFilters,
  getCustomSort,
} from './bundle-modules.utils';

export const BundleModules = (props) => {
  const { jobs, filters, search, setState, sortBy, direction, ...restProps } = props;

  const { chunks, chunkIds } = useMemo(() => extractChunkData(jobs), [jobs]);

  const { defaultFilters, allEntriesFilters } = useMemo(
    () => generateFilters(chunkIds, jobs.length > 1),
    [chunkIds, jobs],
  );

  const searchParams = useSearchParams({
    search,
    filters,
    defaultFilters,
    allEntriesFilters,
    setState,
  });

  const { rows, totalRowCount } = useMemo(() => {
    const result = webpack.compareBySection.modules(jobs, [addRowFlags]);
    return { rows: result, totalRowCount: result.length };
  }, [jobs]);

  const filteredRows = useRowsFilter({
    rows,
    searchPattern: searchParams.searchPattern,
    filters: searchParams.filters,
    getRowFilter: generateGetRowFilter({ chunkIds }),
  });

  const sortParams = useRowsSort({
    rows: filteredRows,
    initialField: sortBy,
    initialDirection: direction,
    getCustomSort,
  });

  const hideEntryInfo = useCallback(() => {
    setState({ entryId: '' });
  }, [setState]);

  return (
    <BundleModulesComponent
      jobs={jobs}
      chunks={chunks}
      {...restProps}
      {...searchParams}
      {...sortParams}
      allItems={rows}
      totalRowCount={totalRowCount}
      hideEntryInfo={hideEntryInfo}
    />
  );
};

BundleModules.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.object).isRequired, // eslint-disable-line react/forbid-prop-types
  filters: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  search: PropTypes.string,
  sortBy: PropTypes.string,
  direction: PropTypes.string,
  setState: PropTypes.func.isRequired,
};

BundleModules.defaultProps = {
  filters: undefined,
  search: undefined,
  sortBy: undefined,
  direction: undefined,
};
