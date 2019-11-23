import { readFileSync } from 'fs-extra';
import { createReport } from '@bundle-stats/utils';

import {
  INITIAL_DATA_PATTERN,
  OUTPUT_FILENAME,
  OUTPUT_TYPE_HTML,
  OUTPUT_TYPE_JSON,
} from './constants';

const templateFilepath = require.resolve('@bundle-stats/html-templates');

export const createHTMLReport = (jobs) => {
  const template = readFileSync(templateFilepath, 'utf-8');
  return template.replace(INITIAL_DATA_PATTERN, `window.__INITIAL_DATA__ = ${JSON.stringify(jobs)}`);
};

export const createJSONReport = (jobs) => JSON.stringify(createReport(jobs), null, 2);

const REPORT_HANDLERS = {
  [OUTPUT_TYPE_HTML]: createHTMLReport,
  [OUTPUT_TYPE_JSON]: createJSONReport,
};

export const createReports = (jobs, options) => {
  const types = [
    ...options.html ? ['html'] : [],
    ...options.json ? ['json'] : [],
  ];

  return Promise.all(
    types.map((type) => ({
      output: REPORT_HANDLERS[type](jobs),
      filename: `${OUTPUT_FILENAME}.${type}`,
    })),
  );
};
