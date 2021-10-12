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
      main: './index.jsx',
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
