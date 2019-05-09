import { createStats, createStatsSummary } from '@relative-ci/utils';
import { last, reverse } from 'lodash';

export const createJobs = (sources) => {
  // @TODO Add source validation

  const jobs = reverse([...sources]).map((res, index) => ({
    internalBuildNumber: (sources.length - index),
    rawData: {
      webpack: {
        stats: res,
      },
    },
  })).reduce((agg, job) => {
    const baseline = last(agg);
    const stats = createStats(baseline && baseline.rawData, job.rawData);
    const summary = createStatsSummary(baseline && baseline.stats, stats);

    return [
      ...agg,
      {
        ...job,
        stats,
        summary,
      },
    ];
  }, []);

  return reverse(jobs);
};
