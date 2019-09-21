export const chunksCountAssetsBundleTransform = (bundleStats = {}) => {
  const { assets } = bundleStats;

  const value = Object.values(assets).filter(({ isChunk }) => isChunk).length;

  return {
    stats: {
      chunksCount: {
        value,
      },
    },
  };
};
