import { createJob } from '@relative-ci/utils';
import { reverse } from 'lodash';

export const createJobs = (sources) => {
  const jobs = reverse([...sources]).reduce((agg, source, idx) => [
    {
      ...createJob({ webpack: { stats: source } }, agg[0]),
      internalBuildNumber: sources.length - idx,
    },
    ...agg,
  ], []);

  return jobs;
};
