import { compose, withProps } from 'recompose';
import { createStats } from '@relative-ci/utils';

import withSources from '../../hocs/with-sources';
import withRuns from '../../hocs/with-runs';

const createJobs = sources => sources.map(({ res }, index) => ({
  internalBuildNumber: index,
  rawData: {
    webpack: {
      stats: res,
    },
  },
})).reduce((agg, job, index, jobs) => [
  ...agg,
  {
    ...job,
    stats: createStats(
      jobs[index + 1] && jobs[index + 1].rawData,
      job.rawData,
    ),
  },
], []);

const metricsMap = {};

const metaMap = {
  hash: 'hash',
};

const enhance = compose(
  withSources(),
  withRuns(metricsMap, metaMap),
  withProps(({ sources }) => ({
    jobs: createJobs(sources),
  })),
);

export default enhance;
