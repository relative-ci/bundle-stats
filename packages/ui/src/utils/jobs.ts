import uniqBy from 'lodash/uniqBy';

import type { Job, WebpackChunk } from '@bundle-stats/utils';

interface GetJobsChunksData {
  chunks: Array<WebpackChunk>;
  chunkIds: Array<string>;
}

/**
 * Get chunks data from all jobs
 */
export function getJobsChunksData(jobs: Array<Job>): GetJobsChunksData {
  const jobChunks = jobs.map((job) => job?.meta?.webpack?.chunks || []);
  const chunks = uniqBy(jobChunks.flat(), ({ id }) => id);
  const chunkIds = chunks?.map(({ id }) => id);

  return {
    chunks,
    chunkIds,
  };
}
