import { useMemo } from 'react';
import { compose, withProps } from 'recompose';
import { get } from 'lodash';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';
import {
  ASSET_ENTRY_TYPE,
  ASSET_FILE_TYPE,
  ASSET_FILTERS,
  getAssetEntryTypeFilters,
  getAssetFileTypeFilters,
  getFileType,
} from '@bundle-stats/utils';

import { withCustomSort } from '../../hocs/with-custom-sort';
import { withFilteredItems } from '../../hocs/with-filtered-items';
import { withSearch } from '../../hocs/with-search';
import {
  SORT_BY_NAME,
  SORT_BY_DELTA,
  SORT_BY_SIZE,
  SORT_BY,
} from './bundle-assets.constants';

const addRowFlags = ({ items }) => {
  const updatedItems = items.map((item) => {
    const { runs } = item;

    const isEntry = runs.map((run) => run && run.isEntry).includes(true);
    const isInitial = runs.map((run) => run && run.isInitial).includes(true);
    const isChunk = runs.map((run) => run && run.isChunk).includes(true);

    const isAsset = !(isEntry || isInitial || isChunk);

    return {
      ...item,
      isEntry,
      isInitial,
      isChunk,
      isAsset,
    };
  });

  return {
    items: updatedItems,
  };
};

const getIsNotPredictive = (key, runs) =>
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

const addRowIsNotPredictive = ({ items }) => ({
  items: items.map((item) => ({
    ...item,
    isNotPredictive: getIsNotPredictive(item.key, item.runs),
  })),
});

const getRowFilter = (filters) => (item) => {
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

const getCustomSort = (sortId) => (item) => {
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

export const enhance = compose(
  withProps(({ jobs }) => {
    const items = useMemo(() => webpack.compareBySection.assets(jobs), [jobs]);

    const defaultFilters = {
      [ASSET_FILTERS.CHANGED]: jobs?.length > 1,
      ...getAssetEntryTypeFilters(true),
      ...getAssetFileTypeFilters(true),
    };

    const allEntriesFilters = {
      [ASSET_FILTERS.CHANGED]: false,
      ...getAssetEntryTypeFilters(true),
      ...getAssetFileTypeFilters(true),
    };

    return {
      items,
      totalRowCount: items.length,
      defaultFilters,
      allEntriesFilters,
    };
  }),

  // @TODO run both transformations in one pass
  withProps(addRowFlags),
  withProps(addRowIsNotPredictive),

  withSearch(),
  withFilteredItems(getRowFilter),
  withCustomSort({ sortItems: SORT_BY, getCustomSort }),
);
