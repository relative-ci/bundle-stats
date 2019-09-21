import { get, map, sum } from 'lodash';

import {
  FILE_TYPE_CSS, FILE_TYPE_JS, FILE_TYPES, getFileType,
} from '../assets/file-types';

const METRIC_NAME_ALL = 'ALL';
const METRIC_NAME_PREFIX = 'totalSizeByType';

const getMetricName = (fileType) => `${METRIC_NAME_PREFIX}${fileType}`;

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

export const sizeAssetsBundleTransform = (bundleStats) => {
  const bundleAssets = Object.values(get(bundleStats, 'assets', {}));

  const sizes = {
    [getMetricName(METRIC_NAME_ALL)]: {
      value: sum(map(bundleAssets, 'value')),
    },
    ...calculateTotalByType(bundleAssets),
    ...calculateInitialTotals(bundleAssets),
  };

  return { sizes };
};
