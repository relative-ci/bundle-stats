import { formatNumber, formatDuration, formatFileSize, formatPercentage } from '../utils/format';
import { MetricTypes, MetricTypeConfig } from '../constants';

export const METRIC_TYPE_CONFIGS: Record<MetricTypes, MetricTypeConfig> = {
  [MetricTypes.Numeric]: {
    biggerIsBetter: false,
    formatter: formatNumber,
  },
  [MetricTypes.Score]: {
    biggerIsBetter: true,
    formatter: formatNumber,
  },
  [MetricTypes.Duration]: {
    biggerIsBetter: false,
    formatter: formatDuration,
  },
  [MetricTypes.FileSize]: {
    biggerIsBetter: false,
    formatter: formatFileSize,
  },
  [MetricTypes.Percentage]: {
    biggerIsBetter: true,
    formatter: formatPercentage,
  },
};
