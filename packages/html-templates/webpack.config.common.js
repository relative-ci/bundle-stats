const fs = require('fs');
const { merge } = require('webpack-merge');
const HtmlPlugin = require('html-webpack-plugin');

const getDefineConfig = require('../../build/configs/define');
const getResolveConfig = require('../../build/configs/resolve');
const getCSSConfig = require('./build/webpack/css');
const appConfig = require('./src/config.json');
const settings = require('./settings');

const { isDevelopment, isProduction, srcDir, distDir } = settings;
const iconSprite = fs.readFileSync(
  require.resolve('@bundle-stats/ui/lib-esm/assets/icons.svg'),
  'utf-8',
);

module.exports = merge(
  {
    context: srcDir,
    entry: {
      main: './index.jsx',
    },
    output: {
      path: distDir,
      filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
      publicPath: '/',
      hashDigestLength: 8,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            cacheDirectory: isDevelopment,
          },
        },
      ],
    },
    plugins: [
      new HtmlPlugin({
        inject: false,
        template: './index.html',
        filename: 'index.html',
        minimize: isProduction,
        iconSprite,
        ...appConfig,
      }),
    ],
    devtool: 'source-map',
  },
  getCSSConfig(settings),
  getDefineConfig(settings),
  getResolveConfig(settings),
);
