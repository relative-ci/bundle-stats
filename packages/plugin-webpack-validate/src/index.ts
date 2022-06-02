import { validate } from 'superstruct';

import * as I18N from './i18n';
import { WebpackSourceStruct } from './schemas';

/**
 * Validate webpack source
 *
 * @param {Object} [webpackSource]
 * @return {String} Message, if invalid, empty string if valid
 */
export default (webpackSource?: any): string => {
  const res = validate(webpackSource, WebpackSourceStruct);

  if (res?.[0]) {
    const failures = res[0].failures();
    let output = `${I18N.INVALID}`;
    failures.forEach((failure) => {
      output += `\n${failure.path.join('.')} - ${failure.message}`;
    });
    return output;
  }

  return '';
};
