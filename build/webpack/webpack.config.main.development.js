const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.config.common');
const mainCommonConfig = require('./webpack.config.main.common');
const commonDevConfig = require('./webpack.config.development');

module.exports = webpackMerge.smart(
  commonConfig,
  mainCommonConfig,
  commonDevConfig,
);
