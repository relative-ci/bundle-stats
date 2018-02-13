const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlPlugin = require('html-webpack-plugin');

const cssConfig = require('./build/webpack/css');

const projectDir = __dirname;
const distDir = path.resolve(projectDir, 'dist');

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
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        },
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
