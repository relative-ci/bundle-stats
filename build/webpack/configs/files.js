const { srcDir, isProduction } = require('../../settings');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg)/,
        loader: 'file-loader',
        options: {
          name: isProduction ? '[path][name].[hash:5].[ext]' : '[path][name].[ext]',
          context: srcDir,
        },
      },
    ],
  },
};
