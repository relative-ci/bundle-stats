import { superstruct } from 'superstruct';

import { INVALID } from '../../locales.json';

const struct = superstruct({
  types: {
    notEmptyArray: (value) => value?.length > 0,
  },
});

const WebpackSourceStruct = struct.interface({
  hash: struct.optional('string'),
  builtAt: struct.optional('number'),
  assets: struct.intersection([
    [
      struct.interface({
        name: 'string',
        size: 'number',
      }),
    ],
    'notEmptyArray',
  ]),
  modules: struct.optional([
    struct.interface({
      name: 'string',
      size: 'number',
      chunks: [struct.union(['number', 'string'])],
    }),
  ]),
  chunks: struct.optional([
    struct.interface({
      id: struct.union(['number', 'string']),
      entry: 'boolean',
      initial: 'boolean',
      names: ['string'],
      files: ['string'],
    }),
  ]),
});

/**
 * Validate webpack source
 *
 * @param {Object} [webpackSource]
 * @return {String} Message, if invalid, empty string if valid
 */
export const validate = (webpackSource) => {
  try {
    WebpackSourceStruct(webpackSource);
  } catch (err) {
    return `${INVALID}\n\n${err.message}`;
  }

  return '';
};
