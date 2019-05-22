import { readFileSync } from 'fs-extra';

import {
  INITIAL_DATA_PATTERN, OUTPUT_TYPE_HTML, OUTPUT_TYPE_JSON,
} from './constants';
import { createJobs } from './create-jobs';

const templateFilepath = require.resolve('@relative-ci/webpack-bundle-stats-html-template');

export const createHTMLReport = (data) => {
  const template = readFileSync(templateFilepath, 'utf-8');
  return template.replace(INITIAL_DATA_PATTERN, `window.__INITIAL_DATA__ = ${JSON.stringify(data)}`);
};

export const createJSONReport = data => JSON.stringify(data, null, 2);

const REPORT_HANDLERS = {
  [OUTPUT_TYPE_HTML]: createHTMLReport,
  [OUTPUT_TYPE_JSON]: createJSONReport,
};

export const createReports = (artifacts, outputTypes) => {
  const initialData = createJobs(artifacts);
  const types = Array.isArray(outputTypes) ? outputTypes : [outputTypes];

  return Promise.all(
    types.map(type => ({
      output: REPORT_HANDLERS[type](initialData),
      type,
    })),
  );
};
