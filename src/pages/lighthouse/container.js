import { compose } from 'recompose';
import { map, sum } from 'lodash';

import withSources from '../../hocs/with-sources';
import withRuns from '../../hocs/with-runs';
import withMetrics from '../../hocs/with-metrics';

const getScore = (res) => {
  const scores = map(res.reportCategories, 'score');
  return Math.round(sum(scores) / scores.length);
};

const metricsMap = {
  'lighthouse.score': getScore,
  'lighthouse.speedIndex': 'audits.speed-index-metric.rawValue',
  'lighthouse.firstMeaningfulPain': 'audits.first-meaningful-paint.rawValue',
  'lighthouse.timeToFirstByte': 'audits.time-to-first-byte.rawValue',
  'lighthouse.firstInteractive': 'audits.first-interactive.rawValue',
  'lighthouse.totalByteWeight': 'audits.total-byte-weight.rawValue',
  'lighthouse.domSize': 'audits.dom-size.rawValue',
};

const metaMap = {
  timestamp: 'generatedTime',
  url: 'url',
};

const enhance = compose(
  withSources(),
  withRuns(metaMap),
  withMetrics(),
);

export default enhance;
