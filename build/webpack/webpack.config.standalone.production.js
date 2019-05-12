const webpackMerge = require('webpack-merge');
const StatsPlugin = require('stats-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const commonConfig = require('./webpack.config.common');
const standaloneCommonConfig = require('./webpack.config.standalone.common');
const { rootDir } = require('../settings');

module.exports = webpackMerge.smart(
  commonConfig,
  standaloneCommonConfig,
  {
    plugins: [
      new StatsPlugin('../../../artifacts/webpack.stats.standalone.json', {
        context: rootDir,
        assets: true,
        entrypoints: true,
        modules: true,
        chunks: true,
        performance: true,
        timings: true,
        children: false,
        source: false,
      }),
    ],
    optimization: {
      minimizer: [new TerserPlugin({ sourceMap: true })],
    },
  },
);
