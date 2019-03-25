import {
  compose, mapProps, withProps, withState,
} from 'recompose';
import { filter, sortBy } from 'lodash';
import { FILE_TYPES, METRIC_TYPE_FILE_SIZE, getFileType } from '@relative-ci/utils';

import withMetrics from '../../hocs/with-metrics';
import getBundleAssetsById from './utils/get-assets-by-id';

import {
  FILTER_ASSET,
  FILTER_CHANGED,
  FILTER_CHUNK,
  FILTER_ENTRY,
  FILTER_INITIAL,
} from './bundle-assets.constants';

const getAssetRunData = (job) => {
  if (!job) {
    return [];
  }

  const { assets = [], entrypoints = {}, chunks = {} } = job.rawData.webpack.stats;
  const entryItems = Object.values(entrypoints)
    .map(({ assets: items }) => items)
    .flat();
  const initialItems = Object.values(chunks)
    .filter(({ initial }) => initial)
    .map(({ files }) => files)
    .flat();
  const chunkItems = Object.values(chunks)
    .filter(({ entry, initial }) => !entry && !initial)
    .map(({ files }) => files)
    .flat();

  return assets.map(asset => ({
    ...asset,
    isEntry: entryItems.includes(asset.name),
    isInitial: initialItems.includes(asset.name),
    isChunk: chunkItems.includes(asset.name),
    type: METRIC_TYPE_FILE_SIZE,
  }));
};

const addRowFlags = ({ rows }) => {
  const updatedRows = rows.map((row) => {
    const { runs } = row;

    const isEntry = runs.map(run => run.isEntry).includes(true);
    const isInitial = runs.map(run => run.isInitial).includes(true);
    const isChunk = runs.map(run => run.isChunk).includes(true);

    const isAsset = !(isEntry || isInitial || isChunk);

    return {
      ...row,
      isEntry,
      isInitial,
      isChunk,
      isAsset,
    };
  });

  return {
    rows: updatedRows,
  };
};

const getIsNotPredictive = (key, runs) => runs.reduce((agg, current, index) => {
  if (agg) {
    return agg;
  }

  if (index + 1 === runs.length) {
    return agg;
  }

  if (
    current.delta !== 0
    && ((key !== current.name) && (current.name === runs[index + 1].name))
  ) {
    return true;
  }

  return agg;
}, false);

const addRowIsNotPredictive = ({ rows }) => ({
  rows: rows.map(row => ({
    ...row,
    isNotPredictive: getIsNotPredictive(row.key, row.runs),
  })),
});

const getRowFilter = filters => (item) => {
  if (filters[FILTER_CHANGED] && !item.changed) {
    return false;
  }

  if (!(
    (filters[`entryTypes.${FILTER_ENTRY}`] && item.isEntry)
    || (filters[`entryTypes.${FILTER_INITIAL}`] && item.isInitial)
    || (filters[`entryTypes.${FILTER_CHUNK}`] && item.isChunk)
    || (filters[`entryTypes.${FILTER_ASSET}`] && item.isAsset)
  )) {
    return false;
  }

  if (!filters[`fileTypes.${getFileType(item.key)}`]) {
    return false;
  }

  return true;
};

const customSort = item => [
  !item.isNotPredictive,
  !item.changed,
  !item.isInitial,
  !item.isEntry,
  !item.isChunk,
  item.key,
];

const getRun = job => ({
  data: getBundleAssetsById(getAssetRunData(job)),
  meta: job,
});

const getFileTypeFilters = (value = true) => FILE_TYPES.reduce((agg, fileTypeFilter) => ({
  ...agg,
  [`fileTypes.${fileTypeFilter}`]: value,
}), {});

const getEntryTypeFilters = (value = true) => [
  FILTER_ENTRY,
  FILTER_INITIAL,
  FILTER_CHUNK,
  FILTER_ASSET,
].reduce((agg, entryTypeFilter) => ({
  ...agg,
  [`entryTypes.${entryTypeFilter}`]: value,
}), {});

export const enhance = compose(
  mapProps(({ jobs, ...restProps }) => ({
    ...restProps,
    runs: jobs.map(getRun),
  })),

  withMetrics(),

  // @TODO run both transformations in one pass
  withProps(addRowFlags),
  withProps(addRowIsNotPredictive),

  withState('filters', 'updateFilters', {
    [FILTER_CHANGED]: true,
    ...getEntryTypeFilters(true),
    ...getFileTypeFilters(true),
  }),

  withProps(({ rows, filters }) => ({
    totalRowCount: rows.length,
    rows: sortBy(filter(rows, getRowFilter(filters)), customSort),
  })),
);
