require('dotenv').config();

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const commonConfig = require('./webpack.config.common');
const mainCommonConfig = require('./webpack.config.main.common');

const { distDir, publicDir } = require('../settings');

module.exports = webpackMerge(
  commonConfig,
  mainCommonConfig,
  {
    output: {
      filename: '[name].[chunkhash:8].js',
    },
    plugins: [
      new CopyPlugin([
        {
          from: publicDir,
          to: distDir,
        },
      ]),
      new webpack.DefinePlugin({
        __GA__: JSON.stringify(process.env.GA),
      }),
      new StatsPlugin('../artifacts/webpack.json', {
        assets: true,
        entrypoints: true,
        modules: true,
        chunks: true,
        performance: true,
        timings: true,
        children: false,
        source: false,
        warnings: false,
      }),
    ],
    optimization: {
      minimizer: [new TerserPlugin({ sourceMap: true })],
      splitChunks: {
        chunks: 'all',
        name: true,
        minSize: Infinity,
        cacheGroups: {
          vendor: {
            chunks: 'initial',
            name: 'vendor',
            filename: 'vendor.[contenthash:5].js',
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            enforce: true,
          },
        },
      },
    },
  },
);
