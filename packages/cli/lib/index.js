class BundleStatsWebpackPlugin {
  constructor() {
    throw new Error([
      'DEPRECATED:',
      'BundleStatsWebpackPlugin is available as a independent package!',
      'npm install --dev bundle-stats-webpack-plugin'
    ].join('\n'))
  }
}

module.exports.BundleStatsWebpackPlugin = BundleStatsWebpackPlugin;
