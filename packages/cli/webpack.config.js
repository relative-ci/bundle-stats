const path = require('path');

const srcDir = path.join(__dirname, 'src');
const outputPath = path.join(__dirname, 'dist');

module.exports = {
  context: srcDir,
  entry: './index.js',
  output: {
    path: outputPath,
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },
  target: 'node',
  resolve: {
    extensions: ['.jsx', '.json', '.js'],
    alias: {
      react: 'preact-compat',
      'react-dom': 'preact-compat',
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: '@prague-digi/empty-object-loader',
      },
    ],
  }
};
