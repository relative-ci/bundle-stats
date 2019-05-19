export const groupChunksByName = (chunks = []) => chunks.reduce((agg, chunk) => ({
  ...agg,
  [chunk.names.join('-')]: chunk,
}), {});
