import { compose, withProps } from 'recompose';

import withSources from '../../hocs/with-sources';
import withRuns from '../../hocs/with-runs';

const createJobs = (sources) => sources.map(({ res }, index) => ({
  internalBuildNumber: index + 1,
  rawData: {
    lighthouse: res,
  },
}));

const metaMap = {
  timestamp: 'generatedTime',
  url: 'url',
};

const enhance = compose(
  withSources(),
  withRuns(metaMap),
  withProps(({ sources }) => ({
    jobs: createJobs(sources),
  })),
);

export default enhance;
