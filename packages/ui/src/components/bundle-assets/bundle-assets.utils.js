/**
 * Get a list of all chunkIds across assets and runs
 *
 * @param {Array<Object>} items
 * @return {Array<string|number>}
 */
export const getAllChunkIds = (items) =>
  items.reduce((agg, item) => {
    const itemChunkIds = item.runs.map((run) => run?.chunkId).filter((chunkId) => typeof(chunkId) !== 'undefined');

    return itemChunkIds.reduce((itemAgg, chunkId) => {
      if (itemAgg.includes(chunkId)) {
        return itemAgg;
      }
      return [...itemAgg, chunkId];
    }, agg);
  }, []);
