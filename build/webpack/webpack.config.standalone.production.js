const webpackMerge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

const commonConfig = require('./webpack.config.common');
const standaloneCommonConfig = require('./webpack.config.standalone.common');

module.exports = webpackMerge.smart(
  commonConfig,
  standaloneCommonConfig,
  {
    optimization: {
      minimizer: [new TerserPlugin({ sourceMap: true })],
    },
  },
);
