const path = require('path');
const CssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (settings) => {
  const { isDevelopment, rootDir } = settings;

  return {
    module: {
      rules: [
        // CSS transformations
        {
          test: /\.css$/,
          use: [
            {
              loader: CssExtractPlugin.loader,
              options: {
                hmr: isDevelopment,
                reloadAll: true,
              },
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: isDevelopment
                    ? '[path][name]__[local]'
                    : '[hash:base64:5]',
                },
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: rootDir,
                },
              },
            }
          ],
          include: [
            /src/,
            /bundle-stats\/ui/,
            path.join(__dirname, '../../packages/ui'), // required for linked packages
            /storybook/,
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
}
