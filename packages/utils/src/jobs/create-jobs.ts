import { createJob } from './create-job';
import { Job, SourceData } from '../constants';
import { generateJobLabel } from './generate-job-label';

/*
 * Create jobs from sources ([current, ..., baseline])
 */
export const createJobs = (sources: Array<SourceData>): Array<Job> => {
  const jobs = [] as Array<Job>;
  const sourcesLength = sources.length;

  for (let i = sourcesLength - 1; i >= 0; i -= 1) {
    const source = sources[i];
    const baseline = jobs.length > 0 ? jobs[jobs.length - 1] : undefined;
    const jobData = createJob(source, baseline);

    const internalBuildNumber = sourcesLength - i;
    const label = generateJobLabel(internalBuildNumber, sourcesLength, i);

    const job = {
      ...jobData,
      internalBuildNumber,
      label,
    };

    jobs.unshift(job);
  }

  return jobs;
};
