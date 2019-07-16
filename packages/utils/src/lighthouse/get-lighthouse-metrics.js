import {
  get, map, mean, round,
} from 'lodash';

const getScore = (res) => {
  const scores = map(res.reportCategories, 'score');
  return round(mean(scores), 2);
};

const METRICS = {
  'lighthouse.score': getScore,
  'lighthouse.speedIndex': 'audits.speed-index-metric.rawValue',
  'lighthouse.firstMeaningfulPain': 'audits.first-meaningful-paint.rawValue',
  'lighthouse.timeToFirstByte': 'audits.time-to-first-byte.rawValue',
  'lighthouse.firstInteractive': 'audits.first-interactive.rawValue',
  'lighthouse.totalByteWeight': 'audits.total-byte-weight.rawValue',
  'lighthouse.domSize': 'audits.dom-size.rawValue',
};

export const getLighthouseMetrics = (data) => {
  if (!data) {
    return {};
  }

  return Object.entries(METRICS)
    .reduce((agg, [metricKey, metricPath]) => ({
      ...agg,
      [metricKey]: {
        value: typeof metricPath === 'function' ? metricPath(data) : get(data, metricPath, 0),
      },
    }), {});
};
