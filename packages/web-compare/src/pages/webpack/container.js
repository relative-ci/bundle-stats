import { compose, withProps } from 'recompose';
import { createStats, createStatsSummary } from '@bundle-stats/utils';
import { last, reverse } from 'lodash';

import withSources from '../../hocs/with-sources';
import withRuns from '../../hocs/with-runs';

const createJobs = (sources) => {
  const jobs = reverse([...sources]).map(({ res }, index) => ({
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

const enhance = compose(
  withSources(),
  withRuns({ hash: 'hash' }),
  withProps(({ sources }) => ({
    jobs: createJobs(sources),
  })),
);

export default enhance;
