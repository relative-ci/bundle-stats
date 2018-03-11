import { map, sum } from 'lodash';

const getScore = (res) => {
  const scores = map(res.reportCategories, 'score');
  return Math.round(sum(scores) / scores.length);
};

export const metricsMap = {
  'lighthouse.score': getScore,
  'lighthouse.speedIndex': 'audits.speed-index-metric.rawValue',
  'lighthouse.firstMeaningfulPain': 'audits.first-meaningful-paint.rawValue',
  'lighthouse.timeToFirstByte': 'audits.time-to-first-byte.rawValue',
  'lighthouse.firstInteractive': 'audits.first-interactive.rawValue',
  'lighthouse.totalByteWeight': 'audits.total-byte-weight.rawValue',
  'lighthouse.domSize': 'audits.dom-size.rawValue',
};

export const metaMap = {
  timestamp: 'generatedTime',
  url: 'url',
};

