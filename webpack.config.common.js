const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlPlugin = require('html-webpack-plugin');

const cssConfig = require('./build/webpack/css');
const appConfig = require('./src/config/app.json');

const projectDir = __dirname;
const distDir = path.resolve(projectDir, 'dist');
const isProduction = process.env.NODE_ENV === 'production';

module.exports = webpackMerge(
  {
    context: path.join(projectDir, 'src'),
    entry: {
      main: './index.jsx',
    },
    output: {
      path: distDir,
      filename: '[name].js',
      publicPath: '/',
    },
    resolve: {
      extensions: ['.jsx', '.js', '.json'],
      alias: {
        react: 'preact-compat',
        'react-dom': 'preact-compat',
      },
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
        __PRODUCTION__: JSON.stringify(process.env.NODE_ENV === 'production'),
        __DEVELOPMENT__: JSON.stringify(process.env.NODE_ENV === 'development'),
      }),
    ],
    devtool: 'source-map',
    devServer: {
      inline: true,
      historyApiFallback: true,
      contentBase: distDir,
    },
  },
  cssConfig,
);
