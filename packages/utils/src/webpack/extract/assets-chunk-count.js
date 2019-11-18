export const extractAssetsChunkCount = (bundleStats = {}) => {
  const { assets } = bundleStats;

  const value = Object.values(assets).filter(({ isChunk }) => isChunk).length;

  return {
    stats: {
      chunkCount: {
        value,
      },
    },
  };
};
