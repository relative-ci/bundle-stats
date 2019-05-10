import { readFileSync } from 'fs-extra';
import { createJobs } from './create-jobs';

const TEMPLATE_FILEPATH = require.resolve('@relative-ci/webpack-bundle-stats-html-template');
const INITIAL_DATA_PATTERN = /window\.__INITIAL_DATA__ = \[\]/;

export const createReport = (artifacts) => {
  const initialData = createJobs(artifacts);

  // @FIXME
  const template = readFileSync(TEMPLATE_FILEPATH, 'utf-8');
  return template.replace(INITIAL_DATA_PATTERN, `window.__INITIAL_DATA__ = ${JSON.stringify(initialData)}`);
};
