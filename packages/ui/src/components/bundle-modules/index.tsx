import React, { useCallback, useMemo } from 'react';
import type { Job } from '@bundle-stats/utils';
// @ts-ignore
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';

import { ModuleSizeMetric } from '../../constants';
import type { ReportMetricModuleRow, SortAction } from '../../types';
import { getJobsChunksData } from '../../utils/jobs';
import { useRowsFilter } from '../../hooks/rows-filter';
import { useRowsSort } from '../../hooks/rows-sort';
import { useSearchParams } from '../../hooks/search-params';
import { useEntryInfo } from '../../hooks/entry-info';
import { BundleModules as BaseComponent } from './bundle-modules';
import {
  addRowFlags,
  generateGetRowFilter,
  generateFilters,
  getCustomSort,
} from './bundle-modules.utils';

interface UseMetricParams {
  metric?: string;
  setState: ({ metric }: { metric: ModuleSizeMetric }) => void;
}

function useModuleMetric(
  params: UseMetricParams,
): [ModuleSizeMetric, (value: ModuleSizeMetric) => void] {
  const { metric, setState } = params;

  const moduleMetric: ModuleSizeMetric = useMemo(() => {
    if (Object.values(ModuleSizeMetric).includes(metric as ModuleSizeMetric)) {
      return metric as ModuleSizeMetric;
    }

    return ModuleSizeMetric.TOTAL_SIZE;
  }, [metric]);

  const setModuleMetric = useCallback(
    (newModuleMetric: ModuleSizeMetric) => {
      if (newModuleMetric !== metric) {
        setState({ metric: newModuleMetric });
      }
    },
    [metric, setState],
  );

  return useMemo(() => [moduleMetric, setModuleMetric], [moduleMetric, setModuleMetric]);
}

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
    | 'allItems'
    | 'totalRowCount'
    | 'hideEntryInfo'
    | 'showEntryInfo'
  > {
  jobs: Array<Job>;
  filters: Record<string, boolean>;
  search?: string;
  metric?: string;
  setState: (params: any) => void;
  sortBy?: string;
  direction?: SortAction['direction'];
}

export const BundleModules = (props: BundleModulesProps) => {
  const { jobs, filters, search, setState, sortBy, direction, metric = '', ...restProps } = props;

  const [moduleMetric, setModuleMetric] = useModuleMetric({ metric, setState });

  const { chunks, chunkIds } = useMemo(() => getJobsChunksData(jobs), [jobs]);

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
    let result: Array<ReportMetricModuleRow> = [];

    if (moduleMetric === ModuleSizeMetric.SIZE) {
      result = webpack.compareBySection.modules(jobs, [addRowFlags]);
    } else if (moduleMetric === ModuleSizeMetric.DUPLICATE_SIZE) {
      result = webpack.compareModuleDuplicateSize(jobs, [addRowFlags]);
    } else {
      result = webpack.compareModuleTotalSize(jobs, [addRowFlags]);
    }

    return {
      rows: result,
      totalRowCount: result.length,
    };
  }, [jobs, moduleMetric]);

  const filteredRows = useRowsFilter({
    rows,
    searchPattern: searchParams.searchPattern,
    filters: searchParams.filters,
    getRowFilter: generateGetRowFilter({ chunkIds }),
  }) as Array<ReportMetricModuleRow>;

  const sortParams = useRowsSort({
    rows: filteredRows,
    initialField: sortBy,
    initialDirection: direction,
    getCustomSort,
    setQueryState: setState,
  });

  const [hideEntryInfo, showEntryInfo] = useEntryInfo({ setState });

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
      showEntryInfo={showEntryInfo}
    />
  );
};
