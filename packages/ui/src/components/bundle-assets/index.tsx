import React, { useMemo } from 'react';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';
import type { Job } from '@bundle-stats/utils';
import { ASSET_FILTERS } from '@bundle-stats/utils';
import {
  getAssetEntryTypeFilters,
  getAssetFileTypeFilters,
} from '@bundle-stats/utils/lib-esm/utils/component-links';

import { useRowsFilter } from '../../hooks/rows-filter';
import { useRowsSort } from '../../hooks/rows-sort';
import { useSearchParams } from '../../hooks/search-params';
import { useEntryInfo } from '../../hooks/entry-info';
import { getJobsChunksData } from '../../utils/jobs';
import { BundleAssets as BundleAssetsComponent } from './bundle-assets';
import {
  addMetricReportAssetRowData,
  generateGetRowFilter,
  getCustomSort,
} from './bundle-assets.utils';
import { ReportMetricAssetRow } from '../../types';

export type BundleAssetsProps = {
  jobs: Array<Job>;
  filters?: Record<string, boolean>;
  search?: string;
  sortBy?: string;
  direction?: string;
  setState: () => void;
};

export const BundleAssets = (props: BundleAssetsProps) => {
  const {
    jobs,
    filters = undefined,
    search = undefined,
    sortBy = undefined,
    direction = undefined,
    setState,
    ...restProps
  } = props;

  // Get chunks data
  const { chunks, chunkIds } = useMemo(() => getJobsChunksData(jobs), [jobs]);

  // Get filters
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

  // Get search params data
  const searchProps = useSearchParams({
    search,
    filters,
    defaultFilters,
    allEntriesFilters,
    setState,
  });

  // Get metric rows
  const { rows, totalRowCount } = useMemo(() => {
    const result = webpack.compareBySection.assets(jobs, [addMetricReportAssetRowData]);
    return { rows: result, totalRowCount: result.length };
  }, [jobs]);

  // Filter rows
  const filteredRows = useRowsFilter({
    rows,
    searchPattern: searchProps.searchPattern,
    filters: searchProps.filters,
    getRowFilter: generateGetRowFilter({ chunkIds }),
  });

  // Sort rows
  const sortProps = useRowsSort<ReportMetricAssetRow>({
    rows: filteredRows,
    initialField: sortBy,
    initialDirection: direction,
    getCustomSort,
    setQueryState: setState,
  });

  const [hideEntryInfo, showEntryInfo] = useEntryInfo({ setState });

  return (
    <BundleAssetsComponent
      {...restProps}
      {...searchProps}
      jobs={jobs}
      chunks={chunks}
      sort={sortProps.sort}
      items={sortProps.items}
      allItems={rows}
      totalRowCount={totalRowCount}
      updateSort={sortProps.updateSort}
      hideEntryInfo={hideEntryInfo}
      showEntryInfo={showEntryInfo}
    />
  );
};
