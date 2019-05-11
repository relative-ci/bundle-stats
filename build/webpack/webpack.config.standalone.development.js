const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.config.common');
const standaloneCommonConfig = require('./webpack.config.standalone.common');
const commonDevConfig = require('./webpack.config.development');

module.exports = webpackMerge.smart(
  commonConfig,
  standaloneCommonConfig,
  commonDevConfig,
);
