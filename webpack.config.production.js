const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin')
const dotenv = require('dotenv');

const commonConfig = require('./webpack.config.common');

const projectDir = __dirname;
const distDir = path.resolve(projectDir, 'dist');

dotenv.config();

module.exports = webpackMerge(commonConfig, {
  output: {
    filename: '[name].[chunkhash:8].js',
  },
  plugins: [
    new CopyPlugin([
      {
        from: path.resolve(__dirname, 'public'),
        to: distDir,
      },
    ]),
    new webpack.DefinePlugin({
      __GA__: JSON.stringify(process.env.GA),
    }),
    new StatsPlugin('../artifacts/webpack.json', {
      assets: true,
      performance: true,
      timings: true,
      children: false,
      source: false,
      modules: false,
      chunks: false,
      warnings: false,
    }),
  ],
});
