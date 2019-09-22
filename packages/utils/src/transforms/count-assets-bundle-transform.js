export const countAssetsBundleTransform = (bundleStats = {}) => {
  const { assets } = bundleStats;

  const value = Object.keys(assets).length;

  return {
    stats: {
      assetCount: {
        value,
      },
    },
  };
};
