import get from 'lodash/get';
import intersection from 'lodash/intersection';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';
import type { ReportMetricRow, WebpackChunk } from '@bundle-stats/utils';
import type { AssetMetricRun } from '@bundle-stats/utils/types/webpack';
import {
  ASSET_CHUNK,
  ASSET_ENTRY_TYPE,
  ASSET_FILE_TYPE,
  ASSET_FILTERS,
  FILE_TYPE_LABELS,
  getFileType,
} from '@bundle-stats/utils';

import type {
  FilterFieldsData,
  ReportMetricAssetRow,
  ReportMetricAssetRowMetaStatus,
  FilterGroupFieldData,
} from '../../types';
import * as I18N from './bundle-assets.i18n';

const NO_CHUNK_FILTER = 'NO_CHUNK';

/**
 * Check if the asset cache is not predictive
 */
export const getIsNotPredictive = (row: ReportMetricRow): boolean => {
  const { key, runs } = row;

  return runs.reduce((agg, run, index) => {
    if (agg) {
      return agg;
    }

    if (index + 1 === runs.length) {
      return agg;
    }

    const preRun = runs[index + 1];

    if (
      run &&
      preRun &&
      key !== run.name &&
      run.name === preRun.name &&
      run.value !== preRun.value
    ) {
      return true;
    }

    return agg;
  }, false);
};

/**
 * Return asset meta status
 */
export const getAssetMetaStatus = (
  values: Array<boolean | undefined>,
): ReportMetricAssetRowMetaStatus | boolean => {
  if (!values.includes(true)) {
    return false;
  }

  // filter empty runs
  const metaValues = values.filter((value) => typeof value !== 'undefined');

  const current = metaValues[0];
  const metaValuesLength = metaValues.length;

  if (metaValuesLength === 1) {
    return Boolean(current);
  }

  const baseline = metaValues[metaValuesLength - 1];

  if (current && !baseline) {
    return 'added';
  }

  if (!current && baseline) {
    return 'removed';
  }

  return true;
};

/**
 * Add asset row flags
 */
export const addMetricReportAssetRowData = (row: ReportMetricRow): ReportMetricAssetRow => {
  const { changed, runs } = row;

  // Collect meta for each run
  const runsEntry: Array<boolean | undefined> = [];
  const runsInitial: Array<boolean | undefined> = [];
  const runsChunk: Array<boolean | undefined> = [];

  (runs as Array<AssetMetricRun | null>).forEach((run) => {
    runsEntry.push(run?.isEntry);
    runsInitial.push(run?.isInitial);
    runsChunk.push(run?.isChunk);
  });

  const isEntry = getAssetMetaStatus(runsEntry);
  const isInitial = getAssetMetaStatus(runsInitial);
  const isChunk = getAssetMetaStatus(runsChunk);
  const isAsset = !(isEntry || isInitial || isChunk);
  const isNotPredictive = getIsNotPredictive(row);
  const fileType = getFileType(row.key);

  // Flag asset as changed if name and value are identical, if one of the meta tags is changed
  const assetChanged =
    changed ||
    typeof isEntry !== 'boolean' ||
    typeof isInitial !== 'boolean' ||
    typeof isChunk !== 'boolean';

  return {
    ...row,
    changed: assetChanged,
    isEntry,
    isInitial,
    isChunk,
    isAsset,
    isNotPredictive,
    fileType,
  };
};

type GenerateGetRowFilterOptions = {
  chunkIds: Array<string>;
};

export const getCustomSort = (item: ReportMetricAssetRow): Array<boolean | string> => [
  !item.isNotPredictive,
  !item.changed,
  !item.isInitial,
  !item.isEntry,
  !item.isChunk,
  item.key,
];

/* eslint-disable prettier/prettier */
const getFileTypeFilters = (filters: Record<string, unknown>): FilterGroupFieldData['children'] => Object.entries(FILE_TYPE_LABELS).map(([key, label]) => ({
  key,
  label,
  defaultValue: get(filters, `${ASSET_FILE_TYPE}.${key}`, true) as boolean,
}));

type GetFiltersOptions = {
  compareMode: boolean;
  filters: Record<string, boolean>;
  chunks: Array<WebpackChunk>;
};

export const getFilters = ({
  compareMode,
  filters,
  chunks,
}: GetFiltersOptions): FilterFieldsData => {
  const result: FilterFieldsData = {
    [ASSET_FILTERS.CHANGED]: {
      label: I18N.CHANGED,
      defaultValue: filters[ASSET_FILTERS.CHANGED],
      disabled: !compareMode,
    },
  };

  if (!isEmpty(chunks)) {
    const chunksFilter: FilterGroupFieldData = {
      label: I18N.CHUNKS,
      children: [
        {
          key: NO_CHUNK_FILTER,
          label: I18N.NO_CHUNK,
          defaultValue: filters[`${ASSET_CHUNK}.${NO_CHUNK_FILTER}`] ?? true,
        },
      ],
    };

    const chunksOrderedByName = orderBy(chunks, 'name');

    chunksOrderedByName.forEach((chunk) => {
      chunksFilter.children.push({
        key: chunk.id,
        label: chunk.name,
        defaultValue: filters[`${ASSET_CHUNK}.${chunk.id}`] ?? true,
      });
    });

    result[ASSET_CHUNK] = chunksFilter;
  }

  result[ASSET_ENTRY_TYPE] = {
    label: I18N.FILE_TYPE,
    children: [
      {
        key: ASSET_FILTERS.ENTRY,
        label: I18N.ENTRY,
        defaultValue: get(filters, `${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.ENTRY}`, true),
      },
      {
        key: ASSET_FILTERS.INITIAL,
        label: I18N.INITIAL,
        defaultValue: get(filters, `${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.INITIAL}`, true),
      },
      {
        key: ASSET_FILTERS.CHUNK,
        label: I18N.CHUNK,
        defaultValue: get(filters, `${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.CHUNK}`, true),
      },
      {
        key: ASSET_FILTERS.OTHER,
        label: I18N.OTHER,
        defaultValue: get(filters, `${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.OTHER}`, true),
      },
    ],
  };

  result[ASSET_FILE_TYPE] = {
    label: I18N.FILE_TYPE,
    children: getFileTypeFilters(filters),
  };

  return result;
};

/* eslint-disable prettier/prettier */
export const generateGetRowFilter =
  ({ chunkIds }: GenerateGetRowFilterOptions) => (filters: Record<string, unknown>) => {
    // List of chunkIds with filter value set to `true`
    const checkedChunkIds: Array<string> = [];
    // List of chunks ids, including the NO_CHUNK
    const filtersChunkIds = [NO_CHUNK_FILTER, ...chunkIds];

    filtersChunkIds.forEach((chunkId) => {
      if (filters[`${ASSET_CHUNK}.${chunkId}`]) {
        checkedChunkIds.push(chunkId);
      }
    });

    const hasChunkFilters =
      checkedChunkIds.length > 0 && checkedChunkIds.length !== filtersChunkIds.length;

    return (item: ReportMetricAssetRow) => {
      if (filters[ASSET_FILTERS.CHANGED] && !item.changed) {
        return false;
      }

      if (
        !(
          (filters[`${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.ENTRY}`] && item.isEntry) ||
          (filters[`${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.INITIAL}`] && item.isInitial) ||
          (filters[`${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.CHUNK}`] && item.isChunk) ||
          (filters[`${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.OTHER}`] && item.isAsset)
        )
      ) {
        return false;
      }

      if (!filters[`${ASSET_FILE_TYPE}.${item.fileType}`]) {
        return false;
      }

      // Filter if any of the chunkIds are checked
      if (hasChunkFilters) {
        const rowRunsChunkIds = item?.runs?.map((run) => run?.chunkId || NO_CHUNK_FILTER) || [];
        return intersection(rowRunsChunkIds, checkedChunkIds).length > 0;
      }

      return true;
    };
  };
