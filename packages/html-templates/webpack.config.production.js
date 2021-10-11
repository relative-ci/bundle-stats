const { merge } = require('webpack-merge');
const StatsPlugin = require('stats-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { RelativeCiAgentWebpackPlugin } = require('@relative-ci/agent');

const getCommonConfig = require('../../build/webpack.config.common');
const appCommonConfig = require('./webpack.config.common');
const settings = require('./settings');

const { rootDir } = settings;

module.exports = merge(getCommonConfig(settings), appCommonConfig, {
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
    new RelativeCiAgentWebpackPlugin({
      stats: {
        excludeAssets: [/index.html$/],
      },
    }),
  ],
  optimization: {
    minimizer: [new TerserPlugin({ sourceMap: true })],
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
        },
      },
    },
  },
});
