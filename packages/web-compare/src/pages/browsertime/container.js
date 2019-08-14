import { compose, withProps } from 'recompose';

import withSources from '../../hocs/with-sources';
import withRuns from '../../hocs/with-runs';

const metaMap = {
  timestamp: 'info.timestamp',
  url: 'info.url',
  connectivity: 'info.connectivity.profile',
};

const createJobs = (sources) => sources.map(({ res }, index) => ({
  internalBuildNumber: index + 1,
  rawData: {
    browsertime: res,
  },
}));

const enhance = compose(
  withSources(),
  withRuns(metaMap),
  withProps(({ sources }) => ({
    jobs: createJobs(sources),
  })),
);

export default enhance;
