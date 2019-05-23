const webpackMerge = require('webpack-merge');
const HtmlPlugin = require('html-webpack-plugin');
const HtmlInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const getCSSConfig = require('../../build/webpack/configs/css');
const getResolveConfig = require('../../build/webpack/configs/resolve');
const settings = require('./settings');
const appConfig = require('./src/config');

const { isProduction } = settings;

module.exports = webpackMerge.smart(
  getCSSConfig(settings),
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
        inlineSource: '.(js|css)$',
        ...appConfig,
      }),
      new HtmlInlineSourcePlugin(),
    ],
  },
);
