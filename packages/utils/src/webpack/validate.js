import { superstruct } from 'superstruct';

import { INVALID } from '../../locales.json';

const struct = superstruct({
  types: {
    notEmptyArray: (value) => value?.length > 0,
  },
});

const { intersection, optional, union } = struct;

const WebpackSourceStruct = struct({
  hash: optional('string'),
  builtAt: optional('number'),
  assets: intersection([
    [
      {
        name: 'string',
        size: 'number',
      },
    ],
    'notEmptyArray',
  ]),
  modules: optional([
    {
      name: 'string',
      size: 'number',
      chunks: [union(['number', 'string'])],
    },
  ]),
  chunks: optional([
    {
      id: union(['number', 'string']),
      entry: 'boolean',
      initial: 'boolean',
      names: ['string'],
      files: ['string'],
    },
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
