const { BundleStatsWebpackPlugin } = require('bundle-stats');

module.exports = (pluginOptions = {}) => (nextConfig = {}) => ({
  ...nextConfig,
  webpack: (config, options) => {
    if (!options.defaultLoaders) {
      throw new Error(
        'This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade',
      );
    }

    const { dev, isServer } = options;

    if (dev || isServer) {
      return config;
    }

    return {
      ...config,
      plugins: [
        ...config.plugins,
        new BundleStatsWebpackPlugin(pluginOptions),
      ],
    };
  },
});
