import { INVALID } from '../../locales.json';
import { WebpackSourceStruct } from './struct';

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
    const { path, type } = err;
    const key = path[0];
    return `${INVALID}\n\nExpected a value of type \`${type}\` for \`${key}\``;
  }

  return '';
};
