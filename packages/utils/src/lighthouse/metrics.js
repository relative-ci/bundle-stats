import {
  METRIC_TYPE_SCORE, METRIC_TYPE_DURATION, METRIC_TYPE_FILE_SIZE, METRIC_TYPE_NUMERIC,
} from '../config/metrics';

export const metrics = {
  score: {
    label: 'Score',
    type: METRIC_TYPE_SCORE,
  },
  performanceScore: {
    label: 'Performance',
    type: METRIC_TYPE_SCORE,
  },
  accessibilityScore: {
    label: 'Accessibility',
    type: METRIC_TYPE_SCORE,
  },
  bestPracticesScore: {
    label: 'Best Practices',
    type: METRIC_TYPE_SCORE,
  },
  seoScore: {
    label: 'SEO',
    type: METRIC_TYPE_SCORE,
  },
  pwaScore: {
    label: 'PWA',
    type: METRIC_TYPE_SCORE,
  },

  speedIndex: {
    label: 'Perceptual Speed Index',
    type: METRIC_TYPE_DURATION,
  },
  firstMeaningfulPaint: {
    label: 'First Meaningful Paint',
    type: METRIC_TYPE_DURATION,
  },
  timeToFirstByte: {
    label: 'Time To First Byte',
    type: METRIC_TYPE_DURATION,
  },
  firstInteractive: {
    label: 'First Interactive',
    type: METRIC_TYPE_DURATION,
  },
  totalByteWeight: {
    label: 'Total Weight',
    type: METRIC_TYPE_FILE_SIZE,
  },
  domSize: {
    label: 'DOM Size',
    type: METRIC_TYPE_NUMERIC,
  },
};
