import {
  compose,
  withProps,
} from 'recompose';

import withSources from '../../hocs/with-sources';
import withMetrics from '../../hocs/with-metrics';
import normalize from '../../utils/browsertime/normalize';

const enhance = compose(
  withSources(),
  withProps(({ sources }) => ({
    runs: normalize(sources),
  })),
  withMetrics(),
);

export default enhance;
