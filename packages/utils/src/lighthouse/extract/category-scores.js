import get from 'lodash/get';

/**
 * Extract lighthouse category scores
 *
 * @param {import("../../../types").LighthouseSource} lighthouseSource
 *
 * @typedef {Object} CategoryScoresMetrics
 * @property {import("../../../types").LighthouseMetricsCategoryScores} metrics
 *
 * @return CategoryScoresMetrics
 */

const METRIC_KEYS = {
  performanceScore: 'performance',
  accessibilityScore: 'accessibility',
  bestPracticesScore: 'best-practices',
  seoScore: 'seo',
  pwaScore: 'pwa',
};

export const extractCategoryScores = (lighthouseSource) => {
  const metrics = Object.entries(METRIC_KEYS).reduce((agg, [metricKey, lighthouseCategoryId]) => ({
    ...agg,
    [metricKey]: {
      value: get(lighthouseSource, ['categories', lighthouseCategoryId, 'score'], 0) * 100,
    },
  }), {});

  return { metrics };
};
