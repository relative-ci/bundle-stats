import get from 'lodash/get';
import mean from 'lodash/mean';
import round from 'lodash/round';

/**
 * Extract average score
 *
 * @param {import("../../../types").LighthouseSource} lighthouseSource
 * @param {Object} currentExtractedData
 *
 * @typedef {Object} CategoryScoresMetrics
 * @property {import("../../../types").LighthouseMetricsScore} metrics
 *
 * @return CategoryScoresMetrics
 */

const SCORES = [
  'performanceScore',
  'accessibilityScore',
  'bestPracticesScore',
  'seoScore',
  'pwaScore',
];

export const extractScoreCategoryScores = (lighthouseSource, currentExtractedData = {}) => {
  const scores = SCORES.map((scoreKey) => get(currentExtractedData, ['metrics', scoreKey, 'value']));
  const score = { value: round(mean(scores), 2) };

  return { metrics: { score } };
};
