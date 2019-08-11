import { get, mean, round } from 'lodash';

const getScore = (res) => {
  const scores = Object.values(res.categories).map(category => category.score);
  return round(mean(scores) * 100);
};

const getCategoryScore = metricPath => res => get(res, metricPath, 0) * 100;

const METRICS = {
  'lighthouse.score': getScore,
  'lighthouse.performanceScore': getCategoryScore('categories.performance.score'),
  'lighthouse.accessibilityScore': getCategoryScore('categories.accessibility.score'),
  'lighthouse.bestPracticesScore': getCategoryScore('categories.best-practices.score'),
  'lighthouse.seoScore': getCategoryScore('categories.seo.score'),
  'lighthouse.pwaScore': getCategoryScore('categories.pwa.score'),

  'lighthouse.speedIndex': 'audits.speed-index.numericValue',
  'lighthouse.firstMeaningfulPaint': 'audits.first-meaningful-paint.numericValue',
  'lighthouse.timeToFirstByte': 'audits.time-to-first-byte.numericValue',
  'lighthouse.firstInteractive': 'audits.first-cpu-idle.numericValue',
  'lighthouse.totalByteWeight': 'audits.total-byte-weight.numericValue',
  'lighthouse.domSize': 'audits.dom-size.numericValue',
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
