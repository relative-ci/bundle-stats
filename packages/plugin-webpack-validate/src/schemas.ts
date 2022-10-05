import {
  intersection,
  union,
  optional,
  nullable,
  nonempty,
  array,
  boolean,
  type,
  number,
  string,
} from 'superstruct';

export const WebpackSourceAssetStruct = type({
  name: string(),
  size: number(),
});

export const WebpackSourceAssetHiddenStruct = type({
  type: string(),
  filteredChildren: number(),
  size: number(),
});

export const WebpackSourceModuleStruct = type({
  name: string(),
  size: number(),
  chunks: array(nullable(union([number(), string()]))),
  modules: optional(array(type({ name: string(), size: number() }))),
});

export const WebpackSourceModuleHiddenStruct = type({
  type: string(),
  filteredChildren: number(),
  size: number(),
});

export const WebpackSourceChunkStruct = type({
  id: nullable(union([number(), string()])),
  entry: boolean(),
  initial: boolean(),
  names: array(string()),
  files: array(string()),
});

export const WebpackSourceStruct = type({
  hash: optional(string()),
  builtAt: optional(number()),
  assets: intersection([
    array(union([WebpackSourceAssetStruct, WebpackSourceAssetHiddenStruct])),
    nonempty(array()),
  ]),
  modules: optional(array(union([WebpackSourceModuleStruct, WebpackSourceModuleHiddenStruct]))),
  chunks: optional(array(WebpackSourceChunkStruct)),
});
