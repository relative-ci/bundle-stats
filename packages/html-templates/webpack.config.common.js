const { resolve } = require('path');
const { merge } = require('webpack-merge');
const HtmlPlugin = require('html-webpack-plugin');
const HtmlInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const getCSSConfig = require('../../build/configs/css');
const getDefineConfig = require('../../build/configs/define');
const getResolveConfig = require('../../build/configs/resolve');
const appConfig = require('./src/config.json');
const settings = require('./settings');

const { isProduction } = settings;

module.exports = merge(
  getCSSConfig(settings),
  getDefineConfig(settings),
  getResolveConfig(settings),
  {
    entry: {
      main: ['./polyfill.js', './index.jsx'],
    },
    resolve: {
      alias: {
        // Prevent dependencies from linked packages to be bundled twice
        // https://app.relative-ci.com/projects/V1bXuieJbYttHCS75L8G/jobs/3543-fbab5d88-5be3-4591-86bf-92b5c8b8f740/packages?bp=%7B%22filters%22%3A%7B%22changed%22%3Afalse%2C%22duplicate%22%3Atrue%7D%2C%22search%22%3A%22~1%22%7D
        lodash: resolve('./node_modules/lodash'),
        'serialize-query-params': resolve('./node_modules/serialize-query-params'),
        'query-string': resolve('./node_modules/query-string'),
        'prop-types': resolve('./node_modules/prop-types'),
        'decode-uri-component': resolve('./node_modules/decode-uri-component'),
      },
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
