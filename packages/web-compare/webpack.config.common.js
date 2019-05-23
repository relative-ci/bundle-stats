const webpackMerge = require('webpack-merge');
const HtmlPlugin = require('html-webpack-plugin');

const getCSSConfig = require('../../build/webpack/configs/css');
const getFilesConfig = require('../../build/webpack/configs/files');
const getResolveConfig = require('../../build/webpack/configs/resolve');
const appConfig = require('./src/config');
const settings = require('./settings');

const { isProduction } = settings;

module.exports = webpackMerge.smart(
  getCSSConfig(settings),
  getFilesConfig(settings),
  getResolveConfig(settings),
  {
    entry: {
      main: [
        './polyfill.js',
        './index.jsx',
      ],
    },
    plugins: [
      new HtmlPlugin({
        template: './index.html',
        filename: 'index.html',
        minimize: isProduction,
        ...appConfig,
      }),
    ],
  },
);
