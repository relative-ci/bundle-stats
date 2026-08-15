import webpackStats from './webpack-stats.current.json';
import { metaCurrent } from './meta';

export default {
  ...metaCurrent,
  rawData: {
    webpack: webpackStats,
  },
};
