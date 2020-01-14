import { get, isEmpty } from 'lodash';

import * as webpack from '../webpack';

export const createReport = (jobs) => {
  const insights = get(jobs, '[0].insights');

  return {
    runs: jobs.map(({ internalBuildNumber, meta }) => ({
      ...meta,
      internalBuildNumber,
    })),

    // Add insights if available
    ...!isEmpty(insights) ? { insights } : {},

    // Add webpack sections comparisons
    ...webpack.SECTIONS.reduce((agg, section) => ({
      ...agg,
      [section]: webpack.compare[section](jobs),
    }), {}),
  };
};
