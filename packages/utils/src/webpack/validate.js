import { INVALID, MISSING_ASSETS, MISSING_MODULES } from '../../locales.json';
/**
 * Validate webpack source
 *
 * @param {Object} [webpackSource]
 * @return {String} Message, if invalid, empty string if valid
 */
export const validate = (webpackSource) => {
  if (!webpackSource) {
    return INVALID;
  }

  if (!webpackSource.assets) {
    return `${MISSING_ASSETS}\n${INVALID}`;
  }

  if (!webpackSource.modules) {
    return `${MISSING_MODULES}\n${INVALID}`;
  }

  return '';
};
