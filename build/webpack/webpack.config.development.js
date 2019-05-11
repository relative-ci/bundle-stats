const { publicDir } = require('../settings');

module.exports = {
  devServer: {
    inline: true,
    historyApiFallback: true,
    contentBase: publicDir,
  },
};
