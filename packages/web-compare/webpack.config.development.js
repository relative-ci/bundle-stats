const webpackMerge = require('webpack-merge');

const commonConfig = require('../../build/webpack.config.common');
const appCommonConfig = require('./webpack.config.common');
const commonDevConfig = require('../../build/webpack.config.development');

const settings = require('./settings');

module.exports = webpackMerge.smart(
  commonConfig(settings),
  appCommonConfig,
  commonDevConfig(settings),
);
