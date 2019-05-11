const HtmlPlugin = require('html-webpack-plugin');

const appConfig = require('../../src/config/app.json');
const { isProduction } = require('../settings');

module.exports = {
  entry: {
    main: [
      './polyfill.js',
      './main.jsx',
    ],
  },
  plugins: [
    new HtmlPlugin({
      template: './main.html',
      filename: 'index.html',
      minimize: isProduction,
      ...appConfig,
    }),
  ],
};
