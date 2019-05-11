const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.config.common');
const standaloneCommonConfig = require('./webpack.config.standalone.common');

module.exports = webpackMerge.smart(
  commonConfig,
  standaloneCommonConfig,
);
