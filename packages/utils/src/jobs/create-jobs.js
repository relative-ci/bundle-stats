import last from 'lodash/last';
import reverse from 'lodash/reverse';

import { createJob } from './create-job';

/*
 * Create jobs from sources
 */
export const createJobs = (sources, options) => {
  const jobs = reverse([...sources]).reduce((agg, source, idx) => {
    const job = createJob(source, last(agg), options);
    const internalBuildNumber = job.internalBuildNumber || idx + 1;
    const label = `Job #${internalBuildNumber}`;

    return [
      {
        ...job,
        internalBuildNumber,
        label,
      },
      ...agg,
    ];
  }, []);

  return jobs;
};
