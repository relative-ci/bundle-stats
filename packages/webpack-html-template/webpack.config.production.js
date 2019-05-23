const webpackMerge = require('webpack-merge');
const StatsPlugin = require('stats-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const getCommonConfig = require('../../build/webpack/webpack.config.common');
const appCommonConfig = require('./webpack.config.common');
const settings = require('./settings');

const { rootDir } = settings;

module.exports = webpackMerge.smart(
  getCommonConfig(settings),
  appCommonConfig,
  {
    plugins: [
      new StatsPlugin('../artifacts/webpack.stats.json', {
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
