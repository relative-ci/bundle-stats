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
            isDevelopment ? 'style-loader' : CssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: isDevelopment
                ? '[path][name]__[local]'
                : '[hash:base64:5]',
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
            /packages\/ui/, // required for linked packages
            /storybook/,
          ],
        },
      ],
    },
    plugins: [
      new CssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[id].[contenthash].css',
      }),
    ],
  };
}
