import { get, isEmpty } from 'lodash';

import * as webpack from '../webpack';

export const createReport = (jobs) => {
  const warnings = get(jobs, '[0].warnings');

  return {
    runs: jobs.map(({ internalBuildNumber, meta }) => ({
      ...meta,
      internalBuildNumber,
    })),

    // Add warnings if available
    ...!isEmpty(warnings) ? { warnings } : {},

    // Add webpack sections comparisons
    ...webpack.SECTIONS.reduce((agg, section) => ({
      ...agg,
      [section]: webpack.compare[section](jobs),
    }), {}),
  };
};
