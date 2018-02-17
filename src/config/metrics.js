import {
  formatNumber,
  formatDuration,
  formatFileSize,
} from '../utils/format';

export const METRIC_TYPE_FILE_SIZE = 'METRIC_TYPE_FILE_SIZE';
export const METRIC_TYPE_DURATION = 'METRIC_TYPE_DURATION';
export const METRIC_TYPE_NUMERIC = 'METRIC_TYPE_NUMERIC';
export const METRIC_TYPE_SCORE = 'METRIC_TYPE_SCORE';

export const METRIC_TYPES = {
  [METRIC_TYPE_NUMERIC]: {
    biggerIsBetter: false,
    formatter: formatNumber,
  },
  [METRIC_TYPE_SCORE]: {
    biggerIsBetter: true,
    formatter: formatNumber,
  },
  [METRIC_TYPE_DURATION]: {
    biggerIsBetter: false,
    formatter: formatDuration,
  },
  [METRIC_TYPE_FILE_SIZE]: {
    biggerIsBetter: false,
    formatter: formatFileSize,
  },
};

const METRICS = {
  webpack: {
    totalSizeByTypeALL: {
      label: 'Total Size',
      type: METRIC_TYPE_FILE_SIZE,
    },
    totalSizeByTypeJS: {
      label: 'JS',
      type: METRIC_TYPE_FILE_SIZE,
    },
    totalSizeByTypeCSS: {
      label: 'CSS',
      type: METRIC_TYPE_FILE_SIZE,
    },
    totalSizeByTypeIMG: {
      label: 'IMG',
      type: METRIC_TYPE_FILE_SIZE,
    },
    totalSizeByTypeMEDIA: {
      label: 'Media',
      type: METRIC_TYPE_FILE_SIZE,
    },
    totalSizeByTypeFONT: {
      label: 'Fonts',
      type: METRIC_TYPE_FILE_SIZE,
    },
    totalSizeByTypeHTML: {
      label: 'HTML',
      type: METRIC_TYPE_FILE_SIZE,
    },
    totalSizeByTypeOTHER: {
      label: 'Other',
      type: METRIC_TYPE_FILE_SIZE,
    },
  },

  lighthouse: {
    score: {
      label: 'Score',
      type: METRIC_TYPE_SCORE,
    },
    'time-to-first-byte': {
      label: 'Time to first byte',
      type: METRIC_TYPE_DURATION,
    },
    'performance-score': {
      label: 'Performance Score',
      type: METRIC_TYPE_SCORE,
    },
  },
};

export default METRICS;
