const webpackStats = require('./webpack-stats.baseline.json');
const { metaBaseline } = require('./meta');

module.exports = {
  ...metaBaseline,
  rawData: {
    webpack: webpackStats,
  },
};
