import get from 'lodash/get';
import map from 'lodash/map';
import sum from 'lodash/sum';

import { FILE_TYPE_CSS, FILE_TYPE_JS, FILE_TYPES } from '../../config/file-types';
import { getFileType } from '../../utils/file-types';
import { SIZE_BY_TYPE_METRIC_ID_PREFIX, SIZE_BY_TYPE_METRIC_ID_ALL } from '../constants';

const getMetricName = (fileType) => `${SIZE_BY_TYPE_METRIC_ID_PREFIX}${fileType}`;

const generateInitialSizeByType = () => FILE_TYPES.reduce((accumulator, fileType) => ({
  ...accumulator,
  [getMetricName(fileType)]: {
    value: 0,
  },
}), {});

const calculateTotalByType = (assets) => assets.reduce((accumulator, current) => {
  const fileType = getFileType(current.name);
  const statName = getMetricName(fileType);
  const value = accumulator[statName].value + current.value;

  return {
    ...accumulator,
    [statName]: {
      value,
    },
  };
}, generateInitialSizeByType());

const getFilterInitialAssetsByType = (fileType) => ({ name, isInitial }) =>
  getFileType(name) === fileType && isInitial; // eslint-disable-line implicit-arrow-linebreak

const calculateInitialTotals = (assets) => {
  const cssAssets = assets.filter(getFilterInitialAssetsByType(FILE_TYPE_CSS));
  const jsAssets = assets.filter(getFilterInitialAssetsByType(FILE_TYPE_JS));

  return {
    totalInitialSizeCSS: {
      value: sum(map(cssAssets, 'value')),
    },
    totalInitialSizeJS: {
      value: sum(map(jsAssets, 'value')),
    },
  };
};

export const extractAssetsSize = (webpackStats, currentExtractedData) => {
  const bundleAssets = Object.values(get(currentExtractedData, 'metrics.assets', {}));

  const sizes = calculateTotalByType(bundleAssets);
  const generic = {
    [getMetricName(SIZE_BY_TYPE_METRIC_ID_ALL)]: {
      value: sum(map(bundleAssets, 'value')),
    },
    ...calculateInitialTotals(bundleAssets),
  };

  return {
    metrics: {
      ...generic,
      sizes,
    },
  };
};
