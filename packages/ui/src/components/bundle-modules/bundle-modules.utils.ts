import intersection from 'lodash/intersection';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import union from 'lodash/union';
import uniqBy from 'lodash/uniqBy';
import type { MetricRunInfo, ReportMetricRow } from '@bundle-stats/utils';
// @ts-ignore
import { MODULE_PATH_PACKAGES, type Module } from '@bundle-stats/utils/lib-esm/webpack';
import {
  FILE_TYPE_LABELS,
  MODULE_CHUNK,
  MODULE_FILTERS,
  MODULE_FILE_TYPE,
  MODULE_SOURCE_TYPE,
  MODULE_SOURCE_FILE_TYPES,
  getModuleSourceFileType,
  getModuleChunkFilters,
  getModuleSourceTypeFilters,
  getModuleFileTypeFilters,
} from '@bundle-stats/utils';
import type { ReportMetricRun } from '@bundle-stats/utils/types/report/types';

import type { FilterFieldsData, FilterGroupFieldData } from '../../types';
import type { Chunk, Job, ReportMetricModuleRow } from './bundle-modules.types';
import * as I18N from './bundle-modules.i18n';

export const addRowFlags = (row: Module & ReportMetricRow): ReportMetricModuleRow => {
  const { key, runs } = row;

  // @NOTE Assign instead destructuring for perf reasons
  // eslint-disable-next-line no-param-reassign
  row.thirdParty = Boolean(key.match(MODULE_PATH_PACKAGES));
  // eslint-disable-next-line no-param-reassign
  row.duplicated = Boolean(runs.find((run: Module & ReportMetricRun) => run?.duplicated === true));
  // eslint-disable-next-line no-param-reassign
  row.fileType = getModuleSourceFileType(row.key);

  return row;
};

export const getCustomSort = (item: ReportMetricRow) => [!item.changed, item.key];

/* eslint-disable prettier/prettier */
export const generateGetRowFilter =
  ({ chunkIds }: { chunkIds: Array<string> }) => (filters: Record<string, unknown>) => {
    // eslint-disable-line prettier/prettier
    // List of chunkIds with filter value set to `true`
    const checkedChunkIds: Array<string> = [];

    chunkIds.forEach((chunkId) => {
      if (filters[`${MODULE_CHUNK}.${chunkId}`]) {
        checkedChunkIds.push(chunkId);
      }
    });

    const hasChunkFilters = checkedChunkIds.length !== chunkIds.length;

    return (row: ReportMetricModuleRow) => {
      // Skip not changed rows
      if (filters[MODULE_FILTERS.CHANGED] && !row.changed) {
        return false;
      }

      // Skip not duplicated rows
      if (filters[MODULE_FILTERS.DUPLICATED] && !row.duplicated) {
        return false;
      }

      // Skip not matching source type
      if (
        !(
          (filters[`${MODULE_SOURCE_TYPE}.${MODULE_FILTERS.FIRST_PARTY}`] &&
            row.thirdParty === false) ||
          (filters[`${MODULE_SOURCE_TYPE}.${MODULE_FILTERS.THIRD_PARTY}`] &&
            row.thirdParty === true)
        )
      ) {
        return false;
      }

      // Skip not matching source file types
      if (!filters[`${MODULE_FILE_TYPE}.${row.fileType}`]) {
        return false;
      }

      // Filter if any of the chunkIds are checked
      if (hasChunkFilters) {
        const rowRunsChunkIds =
          row?.runs?.map((run: Module & MetricRunInfo) => run?.chunkIds || []) || [];
        const rowChunkIds = union(...rowRunsChunkIds);
        const matchedChunkIds = intersection(rowChunkIds, checkedChunkIds);
        return matchedChunkIds.length > 0;
      }

      return true;
    };
  };
/* eslint-enable prettier/prettier */

export const extractChunkData = (jobs: Array<Job>) => {
  const jobChunks = jobs.map((job) => job?.meta?.webpack?.chunks || []);
  const chunks = uniqBy(jobChunks.flat(), ({ id }) => id);

  const chunkIds = chunks?.map(({ id }) => id);

  return {
    chunks,
    chunkIds,
  };
};

export const generateFilters = (chunkIds: Array<string>, multipleJobs: boolean) => {
  const allEntriesFilters = {
    [MODULE_FILTERS.CHANGED]: false,
    [MODULE_FILTERS.DUPLICATED]: false,
    ...getModuleSourceTypeFilters(true),
    ...getModuleChunkFilters(chunkIds, true),
    ...getModuleFileTypeFilters(true),
  };

  return {
    defaultFilters: {
      ...allEntriesFilters,
      // By default, set 'changed' filter to `true` only when we have multiple jobs
      [MODULE_FILTERS.CHANGED]: multipleJobs,
    },
    allEntriesFilters,
  };
};

interface GetFiltersFormDataParams {
  /**
   * Filter values
   */
  filters: Record<string, boolean>;
  /**
   * Chunk data
   */
  chunks: Array<Chunk>;
  /**
   * Compare mode
   */
  compareMode: boolean;
}

/**
 * Generate filter fields data
 * @NOTE use assignments instead of Object.assign/destructuring for performance reson
 */
export const generateFilterFieldsData = (params: GetFiltersFormDataParams): FilterFieldsData => {
  const { filters, chunks, compareMode } = params;

  const result: FilterFieldsData = {
    [MODULE_FILTERS.CHANGED]: {
      label: I18N.CHANGED,
      defaultValue: filters[MODULE_FILTERS.CHANGED],
      disabled: !compareMode,
    },
    [MODULE_FILTERS.DUPLICATED]: {
      label: I18N.DUPLICATE,
      defaultValue: filters[MODULE_FILTERS.DUPLICATED],
    },
  };

  result[MODULE_SOURCE_TYPE] = {
    label: I18N.SOURCE,
    [MODULE_FILTERS.FIRST_PARTY]: {
      label: I18N.SOURCE_FIRST_PARTY,
      defaultValue: get(filters, `${MODULE_SOURCE_TYPE}.${MODULE_FILTERS.FIRST_PARTY}`, true),
    },
    [MODULE_FILTERS.THIRD_PARTY]: {
      label: I18N.SOURCE_THIRD_PARTY,
      defaultValue: get(filters, `${MODULE_SOURCE_TYPE}.${MODULE_FILTERS.THIRD_PARTY}`, true),
    },
  } as FilterGroupFieldData;

  if (!isEmpty(chunks)) {
    const chunksFilter = { label: I18N.CHUNK } as FilterGroupFieldData;
    chunks?.forEach((chunk) => {
      chunksFilter[chunk.id] = {
        label: chunk.name,
        defaultValue: filters[`${MODULE_CHUNK}.${chunk.id}`] ?? true,
      };
    });

    result[MODULE_CHUNK] = chunksFilter;
  }

  const moduleFileTypeFilter = { label: I18N.FILE_TYPE } as FilterGroupFieldData;
  MODULE_SOURCE_FILE_TYPES.forEach((fileType: string) => {
    moduleFileTypeFilter[fileType] = {
      label: FILE_TYPE_LABELS[fileType as keyof typeof FILE_TYPE_LABELS],
      defaultValue: get(filters, `${MODULE_FILE_TYPE}.${fileType}`, true),
    };
  });

  result[MODULE_FILE_TYPE] = moduleFileTypeFilter;

  return result;
};
