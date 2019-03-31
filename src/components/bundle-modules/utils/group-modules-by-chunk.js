export const groupModulesByChunk = (modules = []) => modules.reduce(
  (agg, currentModule) => currentModule.chunks.reduce((aggChunks, chunkId) => ({
    ...aggChunks,
    [chunkId]: [
      ...aggChunks[chunkId] ? aggChunks[chunkId] : [],
      currentModule,
    ],
  }), agg),
  {},
);
