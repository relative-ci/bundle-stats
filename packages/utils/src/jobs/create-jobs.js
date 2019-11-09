import { last, reverse } from 'lodash';

import { createJob } from './create-job';

/*
 * Create jobs from sources
 */
export const createJobs = (sources) => {
  const jobs = reverse([...sources]).reduce((agg, source, idx) => [
    {
      ...createJob(source, last(agg)),
      internalBuildNumber: (idx + 1),
    },
    ...agg,
  ], []);

  return jobs;
};
