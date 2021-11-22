const { merge } = require('webpack-merge');
const StatsPlugin = require('stats-webpack-plugin');
const { RelativeCiAgentWebpackPlugin } = require('@relative-ci/agent');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const appCommonConfig = require('./webpack.config.common');
const settings = require('./settings');

const { rootDir } = settings;

module.exports = merge(appCommonConfig, {
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
  devtool: 'hidden-source-map',
  optimization: {
    minimizer: ['...', new CssMinimizerPlugin()],
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
