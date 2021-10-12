import { get } from 'lodash';
import {
  ASSET_ENTRY_TYPE,
  ASSET_FILE_TYPE,
  ASSET_FILTERS,
} from '@bundle-stats/utils/lib-esm/config/component-links';
import { getFileType } from '@bundle-stats/utils/lib-esm/utils/file-types';

import { SORT_BY_NAME, SORT_BY_DELTA, SORT_BY_SIZE } from './bundle-assets.constants';

export const addRowAssetFlags = (row) => {
  const { runs } = row;

  const isEntry = runs.map((run) => run?.isEntry).includes(true);
  const isInitial = runs.map((run) => run?.isInitial).includes(true);
  const isChunk = runs.map((run) => run?.isChunk).includes(true);

  const isAsset = !(isEntry || isInitial || isChunk);

  return {
    ...row,
    isEntry,
    isInitial,
    isChunk,
    isAsset,
  };
};

export const getIsNotPredictive = (key, runs) =>
  runs.reduce((agg, current, index) => {
    if (agg) {
      return agg;
    }

    if (index + 1 === runs.length) {
      return agg;
    }

    if (
      current &&
      runs[index + 1] &&
      current.delta !== 0 &&
      key !== current.name &&
      current.name === runs[index + 1].name
    ) {
      return true;
    }

    return agg;
  }, false);

export const addRowIsNotPredictive = (row) => ({
  ...row,
  isNotPredictive: getIsNotPredictive(row.key, row.runs),
});

export const getRowFilter = (filters) => (item) => {
  if (filters[ASSET_FILTERS.CHANGED] && !item.changed) {
    return false;
  }

  if (
    !(
      (filters[`${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.ENTRY}`] && item.isEntry) ||
      (filters[`${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.INITIAL}`] && item.isInitial) ||
      (filters[`${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.CHUNK}`] && item.isChunk) ||
      (filters[`${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.ASSET}`] && item.isAsset)
    )
  ) {
    return false;
  }

  if (!filters[`${ASSET_FILE_TYPE}.${getFileType(item.key)}`]) {
    return false;
  }

  return true;
};

export const getCustomSort = (sortId) => (item) => {
  if (sortId === SORT_BY_NAME) {
    return item.key;
  }

  if (sortId === SORT_BY_DELTA) {
    return get(item, 'runs[0].deltaPercentage', 0);
  }

  if (sortId === SORT_BY_SIZE) {
    return get(item, 'runs[0].value', 0);
  }

  return [
    !item.isNotPredictive,
    !item.changed,
    !item.isInitial,
    !item.isEntry,
    !item.isChunk,
    item.key,
  ];
};
