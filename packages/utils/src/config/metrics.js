import {
  formatNumber,
  formatDuration,
  formatFileSize,
  formatPercentage,
} from '../utils/format';

export const METRIC_TYPE_FILE_SIZE = 'METRIC_TYPE_FILE_SIZE';
export const METRIC_TYPE_DURATION = 'METRIC_TYPE_DURATION';
export const METRIC_TYPE_NUMERIC = 'METRIC_TYPE_NUMERIC';
export const METRIC_TYPE_SCORE = 'METRIC_TYPE_SCORE';
export const METRIC_TYPE_PERCENTAGE = 'METRIC_TYPE_PERCENTAGE';

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
  [METRIC_TYPE_PERCENTAGE]: {
    biggerIsBetter: true,
    formatter: formatPercentage,
  },
};
