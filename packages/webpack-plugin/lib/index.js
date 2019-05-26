"use strict";

class BundleStatsWebpackPlugin {
  apply(compiler) {
    const done = (stats, callback = () => {}) => {
      console.log(stats.toJson());
      callback();
    };

    if (compiler.hooks) {
      compiler.hooks.done.tapAsync('bundle-stats-webpack-plugin', done);
    } else {
      compiler.plugin('done', done);
    }
  }

}

module.exports = BundleStatsWebpackPlugin;