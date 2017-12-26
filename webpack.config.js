const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

const projectDir = __dirname;
const distDir = path.resolve(projectDir, 'dist');

module.exports = {
  context: path.join(projectDir, 'src'),
  entry: {
    main: './index.jsx',
  },
  output: {
    path: distDir,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
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
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          'postcss-loader',
        ],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      template: './index.html',
      filename: 'index.html',
    }),
  ],
  devtool: 'source-map',
  devServer: {
    inline: true,
    historyApiFallback: true,
    contentBase: distDir,
  },
};
