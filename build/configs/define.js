const path = require('path');
const webpack = require('webpack');

module.exports = (settings) => {
  const { isProduction, isDevelopment, rootDir } = settings;
  const pkg = require(path.join(rootDir, 'package.json'));

  return {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
        __PRODUCTION__: JSON.stringify(isProduction),
        __DEVELOPMENT__: JSON.stringify(isDevelopment),
        __VERSION__: JSON.stringify(pkg.version),
      }),
    ],
  };
};
