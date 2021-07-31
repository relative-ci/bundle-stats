import { superstruct } from 'superstruct';

const struct = superstruct({
  types: {
    notEmptyArray: (value) => value?.length > 0,
  },
});

export const WebpackSourceAssetStruct = struct.interface({
  name: 'string',
  size: 'number',
});

export const WebpackSourceAssetHiddenStruct = struct.interface({
  type: 'string',
  filteredChildren: 'number',
  size: 'number',
});

export const WebpackSourceModuleStruct = struct.interface({
  name: 'string',
  size: 'number',
  chunks: [struct.union(['number', 'string', 'null'])],
  modules: struct.optional([struct.interface({ name: 'string', size: 'number' })]),
});

export const WebpackSourceChunkStruct = struct.interface({
  id: struct.union(['number', 'string', 'null']),
  entry: 'boolean',
  initial: 'boolean',
  names: ['string'],
  files: ['string'],
});

export const WebpackSourceStruct = struct.interface({
  hash: struct.optional('string'),
  builtAt: struct.optional('number'),
  assets: struct.intersection([
    [struct.union([WebpackSourceAssetStruct, WebpackSourceAssetHiddenStruct])],
    'notEmptyArray',
  ]),
  modules: struct.optional([WebpackSourceModuleStruct]),
  chunks: struct.optional([WebpackSourceChunkStruct]),
});
