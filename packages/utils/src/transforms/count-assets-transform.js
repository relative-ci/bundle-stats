export const countAssetsTransform = (bundleStats = {}) => {
  const { assets } = bundleStats;

  const assetsCount = Object.keys(assets).length;

  return {
    stats: {
      assetsCount,
    },
  };
};
