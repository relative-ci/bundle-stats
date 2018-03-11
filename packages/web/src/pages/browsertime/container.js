import { compose } from 'recompose';

import { metricsMap, metaMap } from '../../../../core/config/browserime';
import withSources from '../../hocs/with-sources';
import withRuns from '../../hocs/with-runs';
import withMetrics from '../../hocs/with-metrics';

const enhance = compose(
  withSources(),
  withRuns(metricsMap, metaMap),
  withMetrics(),
);

export default enhance;
