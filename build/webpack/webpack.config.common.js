const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const cssConfig = require('./configs/css');
const resolveConfig = require('./configs/resolve');
const filesConfig = require('./configs/files');

const {
  rootDir,
  srcDir,
  distDir,
  isProduction,
  isDevelopment,
} = require('../settings');

module.exports = webpackMerge(
  {
    context: srcDir,
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
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
        __PRODUCTION__: JSON.stringify(isProduction),
        __DEVELOPMENT__: JSON.stringify(isDevelopment),
      }),
    ],
    devtool: 'source-map',
  },
  resolveConfig,
  cssConfig,
  filesConfig,
);
