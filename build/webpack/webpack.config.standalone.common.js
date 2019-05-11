const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const { distDir } = require('../settings');
const { isProduction } = require('../settings');
const appConfig = require('../../src/config/app-standalone.json');

module.exports = {
  entry: {
    main: [
      './polyfill.js',
      './standalone.jsx',
    ],
  },
  output: {
    path: path.join(distDir, '../packages/webpack-bundle-stats-html-template/dist'),
  },
  plugins: [
    new HtmlPlugin({
      template: './standalone.html',
      filename: 'index.html',
      minimize: isProduction,
      inlineSource: '.(js|css)$',
      ...appConfig,
    }),
    new HtmlWebpackInlineSourcePlugin(),
  ],
};
