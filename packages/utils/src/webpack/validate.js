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
    return `${INVALID}\n\n${err.message}`;
  }

  return '';
};
