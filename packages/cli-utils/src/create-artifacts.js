import {
  INITIAL_DATA_PATTERN,
  OUTPUT_FILENAME,
  OUTPUT_TYPE_HTML,
  OUTPUT_TYPE_JSON,
} from './constants';

const template = require('@bundle-stats/html-templates');

export const createHTMLArtifact = (jobs) => template.replace(
  INITIAL_DATA_PATTERN,
  `window.__INITIAL_DATA__ = ${JSON.stringify(jobs)}`,
);

export const createJSONArtifact = (_, report) => JSON.stringify(report, null, 2);

const REPORT_HANDLERS = {
  [OUTPUT_TYPE_HTML]: createHTMLArtifact,
  [OUTPUT_TYPE_JSON]: createJSONArtifact,
};

export const createArtifacts = (jobs, report, options) => {
  const types = [
    ...options.html ? ['html'] : [],
    ...options.json ? ['json'] : [],
  ];

  return types.reduce((agg, type) => ({
    ...agg,
    [type]: {
      output: REPORT_HANDLERS[type](jobs, report),
      filename: `${OUTPUT_FILENAME}.${type}`,
    },
  }), {});
};
