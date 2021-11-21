const path = require('path');
const CssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (settings) => {
  const { isDevelopment, rootDir } = settings;

  const include = [
    /src/,
    /bundle-stats\/ui/,
    path.join(rootDir, '../ui'), // required for linked packages
    /storybook/,
  ];

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          use: [
            {
              loader: CssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  auto: true,
                  localIdentName: isDevelopment
                    ? '[path][name]__[local]-[hash:base64:5]'
                    : '[hash:base64:5]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  config: path.join(rootDir, 'postcss.config.js'),
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new CssExtractPlugin({
        filename: isDevelopment ? '[name].css' : '[name].[contenthash].css',
      }),
    ],
  };
};
