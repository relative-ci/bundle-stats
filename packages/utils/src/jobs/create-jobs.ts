import { createJob } from './create-job';
import { Job, SourceData } from '../constants';

/*
 * Create jobs from sources ([current, ..., baseline])
 */
export const createJobs = (sources: Array<SourceData>): Array<Job> => {
  const jobs = [] as Array<Job>;

  for (let i = sources.length - 1; i >= 0; i -= 1) {
    const source = sources[i];
    const baseline = jobs.length > 0 ? jobs[jobs.length - 1] : undefined;
    const jobData = createJob(source, baseline);

    const internalBuildNumber = sources.length - i;
    const label = `Job #${internalBuildNumber}`;

    const job = {
      ...jobData,
      internalBuildNumber,
      label,
    };

    jobs.unshift(job);
  }

  return jobs;
};
