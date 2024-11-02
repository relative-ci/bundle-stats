/**
 * @type {import('@bundle-stats/utils').ReportMetricRow} ReportMetricRow
 * @type {import('../../types').ReportMetricAssetRow} ReportMetricAssetRow
 */

import { ASSET_ENTRY_TYPE, ASSET_FILE_TYPE, ASSET_FILTERS, getFileType } from '@bundle-stats/utils';

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
      current.size !== runs[index + 1].size
    ) {
      return true;
    }

    return agg;
  }, false);
};

/**
 * Add asset row flags
 *
 * @param {ReportMetricRow} row
 * @returns {ReportMetricAssetRow}
 */
export const addMetricReportAssetRowData = (row) => {
  const { runs } = row;

  const isEntry = runs.map((run) => run?.isEntry).includes(true);
  const isInitial = runs.map((run) => run?.isInitial).includes(true);
  const isChunk = runs.map((run) => run?.isChunk).includes(true);
  const isAsset = !(isEntry || isInitial || isChunk);
  const isNotPredictive = getIsNotPredictive(row);
  const fileType = getFileType(row.key);

  return {
    ...row,
    isEntry,
    isInitial,
    isChunk,
    isAsset,
    isNotPredictive,
    fileType,
  };
};

export const getRowFilter = (filters) => (item) => {
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

  return true;
};

export const getCustomSort = (item) => [
  !item.isNotPredictive,
  !item.changed,
  !item.isInitial,
  !item.isEntry,
  !item.isChunk,
  item.key,
];
