
module.exports = (settings) =>{
  const { publicDir } = settings;

  return {
    devServer: {
      inline: true,
      historyApiFallback: true,
      contentBase: publicDir,
    },
  };
};
