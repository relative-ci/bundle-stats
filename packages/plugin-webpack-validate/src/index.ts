import { validate } from 'superstruct';
import get from 'lodash/get';

import * as I18N from './i18n';
import { WebpackSourceStruct } from './schemas';

interface FailedStructure {
  path: string;
  source: Record<string, unknown>;
}

function extractFailedStructure(
  webpackSource: any,
  failurePath: Array<number | string>,
): FailedStructure | null {
  if (failurePath.length === 0) {
    return null;
  }

  const source = get(webpackSource, failurePath);

  // Return source as if the failure paths are pointing to an object
  if (typeof source === 'object') {
    return {
      path: failurePath.join('.'),
      source,
    };
  }

  // Extract the parent object
  return extractFailedStructure(webpackSource, failurePath.slice(0, -1));
}

/**
 * Validate webpack source
 *
 * @param {Object} [webpackSource]
 * @return {String} Message, if invalid, empty string if valid
 */
export default (webpackSource?: any): string => {
  const res = validate(webpackSource, WebpackSourceStruct);

  if (!res?.[0]) {
    return '';
  }

  // Return only the first failure
  const failures = res[0].failures();
  const output = [`${I18N.INVALID}`];

  failures.forEach((failure) => {
    const failureOutput = ['', failure.message, `Path: ${failure.path.join('.')}`];

    const failedSource = extractFailedStructure(webpackSource, failure.path);

    if (failedSource) {
      failureOutput.push(
        `Failed structure(${failedSource.path}): ${JSON.stringify(failedSource.source, null, 2)}`,
      );
    }

    output.push(failureOutput.join('\n'));
  });

  return output.join('\n');
};
