export const chunksCountAssetsTransform = (bundleStats = {}) => {
  const { assets } = bundleStats;

  const chunksCount = Object.values(assets).filter(({ isChunk }) => isChunk).length;

  return {
    stats: {
      chunksCount,
    },
  };
};
