import webpackStats from './webpack-stats.baseline.json';
import { metaBaseline } from './meta';

export default {
  ...metaBaseline,
  rawData: {
    webpack: webpackStats,
  },
};
