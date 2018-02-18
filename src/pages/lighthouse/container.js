import { compose, withProps } from 'recompose';

import normalize from '../../utils/lighthouse/normalize';
import withSources from '../../hocs/with-sources';
import withMetrics from '../../hocs/with-metrics';

const enhance = compose(
  withSources(),
  withProps(({ sources }) => ({
    runs: normalize(sources),
  })),
  withMetrics(),
);

export default enhance;
