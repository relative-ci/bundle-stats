import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import uniqBy from 'lodash/uniqBy';
import {
  MODULE_FILTERS,
  getModuleChunkFilters,
  getModuleSourceTypeFilters,
  getModuleFileTypeFilters,
} from '@bundle-stats/utils';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';

import { useRowsFilter } from '../../hooks/rows-filter';
import { useRowsSort } from '../../hooks/rows-sort';
import { useSearchParams } from '../../hooks/search-params';
import { BundleModules as BundleModulesComponent } from './bundle-modules';
import {
  addRowFlags,
  getRowFilter,
  getCustomSort,
  useModuleFilterByChunk,
} from './bundle-modules.utils';
import { SORT_BY } from './bundle-modules.constants';

export const BundleModules = (props) => {
  const { jobs, filters, search, setState, sortBy, direction, ...restProps } = props;

  const { chunks, chunkIds } = useMemo(
    () => {
      const bundleChunks = uniqBy(
        jobs.map((job) => job?.meta?.webpack?.chunks || []).flat(),
        ({ id }) => id
      );
      const bundleChunkIds = bundleChunks?.map(({ id }) => id);

      return {
        chunks: bundleChunks,
        chunkIds: bundleChunkIds,
      };
    },
    [jobs],
  );

  const { defaultFilters, allEntriesFilters } = useMemo(
    () => ({
      defaultFilters: {
        changed: jobs?.length > 1,
        ...getModuleSourceTypeFilters(true),
        ...getModuleChunkFilters(chunkIds, true),
        ...getModuleFileTypeFilters(true),
        [MODULE_FILTERS.DUPLICATED]: false,
      },
      allEntriesFilters: {
        changed: false,
        ...getModuleSourceTypeFilters(true),
        ...getModuleChunkFilters(chunkIds, true),
        ...getModuleFileTypeFilters(true),
        [MODULE_FILTERS.DUPLICATED]: false,
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

  const filteredJobsByChunkIds = useModuleFilterByChunk({
    jobs,
    filters: searchParams.filters,
    chunkIds,
  });

  const { rows, totalRowCount } = useMemo(() => {
    const result = webpack.compareBySection.modules(filteredJobsByChunkIds, [addRowFlags]);
    return { rows: result, totalRowCount: result.length };
  }, [filteredJobsByChunkIds]);

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
    <BundleModulesComponent
      jobs={jobs}
      chunks={chunks}
      {...restProps}
      {...searchParams}
      {...sortParams}
      totalRowCount={totalRowCount}
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
