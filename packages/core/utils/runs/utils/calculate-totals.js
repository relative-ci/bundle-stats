import { sum, map } from 'lodash';

// Content types a la Chrome Dev Toolbar
const FILE_TYPES = {
  CSS: /\.css$/,
  JS: /\.js$/,
  IMG: /\.(png|jpe?g|webp|gif|svg|ico)$/,
  MEDIA: /\.(mp4|mp3|mov)$/,
  FONT: /\.(woff|woff2|ttf|otf)$/,
  HTML: /\.(html?)$/,
  OTHER: /^.*$/,
};
const METRIC_NAME_ALL = 'ALL';
const METRIC_NAME_PREFIX = 'webpack.totalSizeByType';
const IGNORED_EXTENSIONS = /\.map$/;

const getMetricName = fileType =>
  `${METRIC_NAME_PREFIX}${fileType}`;

const constructInitialSizeByType = () =>
  Object.keys(FILE_TYPES).reduce((accumulator, fileType) => ({
    ...accumulator,
    [getMetricName(fileType)]: {
      value: 0,
    },
  }), {});

const calculateTotalByType = assets =>
  assets.reduce((accumulator, current) => {
    const foundType = Object.entries(FILE_TYPES).find(([, typePattern]) =>
      current.name.match(typePattern));

    const statName = getMetricName(foundType[0]);
    const value = accumulator[statName].value + current.size;

    return {
      ...accumulator,
      [statName]: {
        value,
      },
    };
  }, constructInitialSizeByType());

const isAssetValid = asset =>
  // Ignore particular extensions
  !IGNORED_EXTENSIONS.test(asset.name) &&

  // Skip files that have 0 size (eg: webpack.json)
  asset.value !== 0;

const calculateTotals = (assets) => {
  const filteredAssets = assets.filter(isAssetValid);

  const stats = {
    [getMetricName(METRIC_NAME_ALL)]: {
      value: sum(map(filteredAssets, 'size')),
    },
    ...calculateTotalByType(filteredAssets),
  };

  return stats;
};

export default calculateTotals;
