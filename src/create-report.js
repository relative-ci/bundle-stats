import path from 'path';
import { readFileSync } from 'fs-extra';
import { createJobs } from './create-jobs';

const TEMPLATE_FILEPATH = path.join(__dirname, './report.html');
const INITIAL_DATA_PATTERN = /"__INITIAL_DATA_PLACEHOLDER__"/;

export const createReport = (artifacts) => {
  const initialData = createJobs(artifacts);

  // @FIXME
  const template = readFileSync(TEMPLATE_FILEPATH, 'utf-8');
  return template.replace(INITIAL_DATA_PATTERN, JSON.stringify(initialData));
};
