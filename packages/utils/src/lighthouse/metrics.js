import { MetricTypes } from '../constants';

export const metrics = {
  score: {
    label: 'Score',
    type: MetricTypes.Score,
  },
  performanceScore: {
    label: 'Performance',
    type: MetricTypes.Score,
  },
  accessibilityScore: {
    label: 'Accessibility',
    type: MetricTypes.Score,
  },
  bestPracticesScore: {
    label: 'Best Practices',
    type: MetricTypes.Score,
  },
  seoScore: {
    label: 'SEO',
    type: MetricTypes.Score,
  },
  pwaScore: {
    label: 'PWA',
    type: MetricTypes.Score,
  },

  speedIndex: {
    label: 'Perceptual Speed Index',
    type: MetricTypes.Duration,
  },
  firstMeaningfulPaint: {
    label: 'First Meaningful Paint',
    type: MetricTypes.Duration,
  },
  timeToFirstByte: {
    label: 'Time To First Byte',
    type: MetricTypes.Duration,
  },
  firstInteractive: {
    label: 'First Interactive',
    type: MetricTypes.Duration,
  },
  totalByteWeight: {
    label: 'Total Weight',
    type: MetricTypes.FileSize,
  },
  domSize: {
    label: 'DOM Size',
    type: MetricTypes.Numeric,
  },
};
