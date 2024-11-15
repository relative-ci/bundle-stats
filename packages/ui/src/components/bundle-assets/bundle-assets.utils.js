/**
 * @type {import('@bundle-stats/utils').ReportMetricRow} ReportMetricRow
 * @type {import('../../types').ReportMetricAssetRow} ReportMetricAssetRow
 * @type {import('../../types').ReportMetricAssetRowMetaStatus} ReportMetricAssetRowFlagStatus
 */

import intersection from 'lodash/intersection';
import {
  ASSET_CHUNK,
  ASSET_ENTRY_TYPE,
  ASSET_FILE_TYPE,
  ASSET_FILTERS,
  getFileType,
} from '@bundle-stats/utils';

/**
 * Check if the asset cache is not predictive
 *
 * @param {ReportMetricRow} row
 * @returns {boolean}
 */
export const getIsNotPredictive = (row) => {
  const { key, runs } = row;

  return runs.reduce((agg, current, index) => {
    if (agg) {
      return agg;
    }

    if (index + 1 === runs.length) {
      return agg;
    }

    if (
      current &&
      runs[index + 1] &&
      key !== current.name &&
      current.name === runs[index + 1].name &&
      current.value !== runs[index + 1].value
    ) {
      return true;
    }

    return agg;
  }, false);
};

/**
 * @param {Array<boolean>}
 * @returns {ReportMetricAssetRowFlagStatus | boolean}
 */
export const getAssetMetaStatus = (values) => {
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
 *
 * @param {ReportMetricRow} row
 * @returns {ReportMetricAssetRow}
 */
export const addMetricReportAssetRowData = (row) => {
  const { changed, runs } = row;

  // Collect meta for each run
  const runsEntry = [];
  const runsInitial = [];
  const runsChunk = [];

  runs.forEach((run) => {
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

/* eslint-disable prettier/prettier */
export const generateGetRowFilter =
  ({ chunkIds }) => (filters) => {
    // List of chunkIds with filter value set to `true`
    const checkedChunkIds = [];

    chunkIds.forEach((chunkId) => {
      if (filters[`${ASSET_CHUNK}.${chunkId}`]) {
        checkedChunkIds.push(chunkId);
      }
    });

    const hasChunkFilters =
      checkedChunkIds.length > 0 && checkedChunkIds.length !== chunkIds.length;

    return (item) => {
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
        const rowRunsChunkIds = item?.runs?.map((run) => run?.chunkId) || [];
        return intersection(rowRunsChunkIds, checkedChunkIds).length > 0;
      }

      return true;
    };
  };

export const getCustomSort = (item) => [
  !item.isNotPredictive,
  !item.changed,
  !item.isInitial,
  !item.isEntry,
  !item.isChunk,
  item.key,
];
