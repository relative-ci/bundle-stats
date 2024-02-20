import React, { useCallback, useMemo, useState } from 'react';
// @ts-ignore
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';

import type { SortAction } from '../../types';
import { useRowsFilter } from '../../hooks/rows-filter';
import { useRowsSort } from '../../hooks/rows-sort';
import { useSearchParams } from '../../hooks/search-params';
import { BundleModules as BaseComponent } from './bundle-modules';
import {
  addRowFlags,
  extractChunkData,
  generateGetRowFilter,
  generateFilters,
  getCustomSort,
} from './bundle-modules.utils';
import { ModuleMetric } from './bundle-modules.constants';
import * as types from './bundle-modules.types';

interface BundleModulesProps
  extends Omit<
    React.ComponentProps<typeof BaseComponent>,
    | 'jobs'
    | 'items'
    | 'chunks'
    | 'updateFilters'
    | 'resetFilters'
    | 'resetAllFilters'
    | 'filters'
    | 'sort'
    | 'updateSort'
    | 'search'
    | 'updateSearch'
    | 'entryId'
    | 'allItems'
    | 'totalRowCount'
    | 'hideEntryInfo'
  > {
  jobs: Array<types.Job>;
  filters: Record<string, boolean>;
  search?: string;
  setState: (params: any) => void;
  sortBy?: string;
  direction?: SortAction['direction'];
}

export const BundleModules = (props: BundleModulesProps) => {
  const { jobs, filters, search, setState, sortBy, direction, ...restProps } = props;

  const [moduleMetric, setModuleMetric] = useState<ModuleMetric>(ModuleMetric.SIZE);

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
    let result;
    if (moduleMetric === ModuleMetric.TOTAL_SIZE) {
      result = webpack.compareModuleDuplicateSize(jobs, [addRowFlags]);
    } else if (moduleMetric === ModuleMetric.SIZE) {
      result = webpack.compareBySection.modules(jobs, [addRowFlags]);
    }
    return {
      rows: result as Array<types.ReportMetricModuleRow>,
      totalRowCount: result.length,
    };
  }, [jobs, moduleMetric]);

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
    <BaseComponent
      jobs={jobs}
      chunks={chunks}
      {...restProps}
      {...searchParams}
      {...sortParams}
      allItems={rows}
      totalRowCount={totalRowCount}
      hideEntryInfo={hideEntryInfo}
      moduleMetric={moduleMetric}
      setModuleMetric={setModuleMetric}
    />
  );
};
