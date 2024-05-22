const webpackStats = require('./webpack-stats.current.json');
const { currentMeta } = require('./meta');

module.exports = {
  ...currentMeta,
  rawData: {
    webpack: webpackStats,
  },
};
