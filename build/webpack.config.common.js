const path = require('path');

module.exports = (settings) => {
  const {
    srcDir, distDir, isDevelopment, rootDir,
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
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            cacheDirectory: isDevelopment,
          },
        },
      ],
    },
    devtool: 'source-map',
  };
};
