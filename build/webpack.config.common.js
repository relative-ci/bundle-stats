const path = require('path');
const process = require('process');
const webpack = require('webpack');

module.exports = (settings) => {
  const {
    srcDir, distDir, isProduction, isDevelopment, rootDir,
  } = settings;

  return {
    context: srcDir,
    output: {
      path: distDir,
      filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
      publicPath: '/',
      hashDigestLength: 8
    },
    resolve: {
      modules: [
        'node_modules',
        path.join(rootDir, 'node_modules'),
      ],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          enforce: 'pre',
          use: 'eslint-loader',
          exclude: [
            /node_modules/,
            path.join(__dirname, '../packages'), // local linked packages
          ]
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
  };
};
