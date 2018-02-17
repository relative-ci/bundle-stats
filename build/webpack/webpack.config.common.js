const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlPlugin = require('html-webpack-plugin');

const cssConfig = require('./configs/css');
const resolveConfig = require('./configs/resolve');
const appConfig = require('../../src/config/app.json');

const {
  srcDir,
  distDir,
  isProduction,
  isDevelopment,
} = require('../settings');

module.exports = webpackMerge(
  {
    context: srcDir,
    entry: {
      main: [
        './polyfill.js',
        './index.jsx',
      ],
    },
    output: {
      path: distDir,
      filename: '[name].js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          enforce: 'pre',
          use: 'eslint-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.jsx?$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new HtmlPlugin({
        template: './index.html',
        filename: 'index.html',
        title: appConfig.tilte,
        minimize: isProduction,
      }),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
        __PRODUCTION__: JSON.stringify(isProduction),
        __DEVELOPMENT__: JSON.stringify(isDevelopment),
      }),
    ],
    devtool: 'source-map',
    devServer: {
      inline: true,
      historyApiFallback: true,
      contentBase: distDir,
    },
  },
  resolveConfig,
  cssConfig,
);
