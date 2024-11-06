import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { PACKAGE_FILTERS } from '@bundle-stats/utils';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack/compare';

import { useRowsFilter } from '../../hooks/rows-filter';
import { useRowsSort } from '../../hooks/rows-sort';
import { useSearchParams } from '../../hooks/search-params';
import { useEntryInfo } from '../../hooks/entry-info';
import { BundlePackages as BundlePackagesComponent } from './bundle-packages';
import {
  getDuplicatePackages,
  getAddRowDuplicateFlag,
  getRowFilter,
  getCustomSort,
} from './bundle-packages.utils';

export const BundlePackages = (props) => {
  const { jobs, search, filters, setState, sortBy, direction, ...restProps } = props;

  const { defaultFilters, allEntriesFilters } = useMemo(
    () => ({
      defaultFilters: {
        [PACKAGE_FILTERS.CHANGED]: jobs?.length > 1,
        [PACKAGE_FILTERS.DUPLICATE]: false,
      },
      allEntriesFilters: {
        [PACKAGE_FILTERS.CHANGED]: false,
        [PACKAGE_FILTERS.DUPLICATE]: false,
      },
    }),
    [jobs],
  );

  const searchParams = useSearchParams({
    search,
    filters,
    defaultFilters,
    allEntriesFilters,
    setState,
  });

  const { rows, totalRowCount } = useMemo(() => {
    const duplicateJobs = getDuplicatePackages(jobs);
    const result = webpack.compareBySection.packages(jobs, [getAddRowDuplicateFlag(duplicateJobs)]);
    return { rows: result, totalRowCount: result.length };
  }, [jobs]);

  const filteredRows = useRowsFilter({
    rows,
    searchPattern: searchParams.searchPattern,
    filters: searchParams.filters,
    getRowFilter,
  });

  const sortParams = useRowsSort({
    rows: filteredRows,
    initialField: sortBy,
    initialDirection: direction,
    getCustomSort,
    setQueryState: setState,
  });

  const [hideEntryInfo, showEntryInfo] = useEntryInfo({ setState });

  return (
    <BundlePackagesComponent
      jobs={jobs}
      {...restProps}
      {...searchParams}
      {...sortParams}
      allItems={rows}
      totalRowCount={totalRowCount}
      hideEntryInfo={hideEntryInfo}
      showEntryInfo={showEntryInfo}
    />
  );
};

BundlePackages.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.object).isRequired, // eslint-disable-line react/forbid-prop-types
  filters: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  search: PropTypes.string,
  sortBy: PropTypes.string,
  direction: PropTypes.string,
  setState: PropTypes.func.isRequired,
};

BundlePackages.defaultProps = {
  filters: undefined,
  search: undefined,
  sortBy: undefined,
  direction: undefined,
};
