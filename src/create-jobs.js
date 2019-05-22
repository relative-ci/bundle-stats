import { createJob } from '@relative-ci/utils';
import { last, reverse } from 'lodash';

export const createJobs = (sources) => {
  const jobs = reverse([...sources]).reduce((agg, source, idx) => [
    {
      ...createJob({ webpack: { stats: source } }, last(agg)),
      internalBuildNumber: (sources.length - idx),
    },
    ...agg,
  ], []);

  return jobs;
};
