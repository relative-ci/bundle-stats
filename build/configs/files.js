module.exports = (settings) => {
  const { srcDir, isProduction } = settings;

  return {
    module: {
      rules: [
        {
          test: /\.(png|jpg|jpeg|gif|svg)/,
          loader: 'file-loader',
          options: {
            name: isProduction ? '[path][name].[hash:8].[ext]' : '[path][name].[ext]',
            context: srcDir,
          },
        },
      ],
    },
  };
};
