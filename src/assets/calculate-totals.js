import { sum, map } from 'lodash';
import { FILE_TYPES, getFileType } from './file-types';

const METRIC_NAME_ALL = 'ALL';
const METRIC_NAME_PREFIX = 'totalSizeByType';
const IGNORED_EXTENSIONS = /\.map$/;

const getMetricName = fileType => `${METRIC_NAME_PREFIX}${fileType}`;

const constructInitialSizeByType = () => FILE_TYPES.reduce((accumulator, fileType) => ({
  ...accumulator,
  [getMetricName(fileType)]: {
    value: 0,
  },
}), {});

const calculateTotalByType = assets => assets.reduce((accumulator, current) => {
  const fileType = getFileType(current.name);

  const statName = getMetricName(fileType);
  const value = accumulator[statName].value + current.size;

  return {
    ...accumulator,
    [statName]: {
      value,
    },
  };
}, constructInitialSizeByType());

const isAssetValid = asset => !IGNORED_EXTENSIONS.test(asset.name)

  // Skip files that have 0 size (eg: webpack.json)
  && asset.value !== 0;

// eslint-disable-next-line import/prefer-default-export
export const calculateTotals = (assets) => {
  const filteredAssets = assets.filter(isAssetValid);

  const stats = {
    [getMetricName(METRIC_NAME_ALL)]: {
      value: sum(map(filteredAssets, 'size')),
    },
    ...calculateTotalByType(filteredAssets),
  };

  return stats;
};
