import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';
import { ASSET_FILTERS } from '@bundle-stats/utils';
import {
  getAssetEntryTypeFilters,
  getAssetFileTypeFilters,
} from '@bundle-stats/utils/lib-esm/utils/component-links';

import { useRowsFilter } from '../../hooks/rows-filter';
import { useRowsSort } from '../../hooks/rows-sort';
import { useSearchParams } from '../../hooks/search-params';
import { BundleAssets as BundleAssetsComponent } from './bundle-assets';
import { addRowAssetFlags, addRowIsNotPredictive, getRowFilter, getCustomSort } from './bundle-assets.utils';
import { SORT_BY } from './bundle-assets.constants';

export const BundleAssets = (props) => {
  const { jobs, filters, search, setState, sortBy, direction, ...restProps } = props;

  const { defaultFilters, allEntriesFilters } = useMemo(
    () => ({
      defaultFilters: {
        [ASSET_FILTERS.CHANGED]: jobs?.length > 1,
        ...getAssetEntryTypeFilters(true),
        ...getAssetFileTypeFilters(true),
      },
      allEntriesFilters: {
        [ASSET_FILTERS.CHANGED]: false,
        ...getAssetEntryTypeFilters(true),
        ...getAssetFileTypeFilters(true),
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
    const result = webpack.compareBySection.assets(jobs, [addRowAssetFlags, addRowIsNotPredictive]);
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
    sortFields: SORT_BY,
    sortBy,
    sortDirection: direction,
    getCustomSort,
  });

  return (
    <BundleAssetsComponent
      jobs={jobs}
      {...restProps}
      {...searchParams}
      {...sortParams}
      totalRowCount={totalRowCount}
    />
  );
};

BundleAssets.propTypes = {
  jobs: PropTypes.arrayOf(PropTypes.object).isRequired, // eslint-disable-line react/forbid-prop-types
  filters: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  search: PropTypes.string,
  sortBy: PropTypes.string,
  direction: PropTypes.string,
  setState: PropTypes.func.isRequired,
};

BundleAssets.defaultProps = {
  filters: undefined,
  search: undefined,
  sortBy: undefined,
  direction: undefined,
};
