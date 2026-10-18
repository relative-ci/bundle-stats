import {
  type MetricRunInfo,
  type ReportMetricRow,
  METRIC_TYPE_CONFIGS,
  getMetricRunInfo,
} from '@bundle-stats/utils';

const METRIC_TYPE = METRIC_TYPE_CONFIGS.METRIC_TYPE_FILE_SIZE;

/**
 * Baseline value used by the delta fixtures
 */
export const BASELINE_VALUE = 10 * 1024;

/**
 * Current values resolving to every file size delta type (smaller is better)
 */
export const CURRENT_VALUE_BY_DELTA_TYPE = {
  NO_CHANGE: BASELINE_VALUE,
  LOW_NEGATIVE: BASELINE_VALUE * 1.02,
  NEGATIVE: BASELINE_VALUE * 1.2,
  HIGH_NEGATIVE: BASELINE_VALUE * 2,
  LOW_POSITIVE: BASELINE_VALUE * 0.98,
  POSITIVE: BASELINE_VALUE * 0.8,
  HIGH_POSITIVE: BASELINE_VALUE * 0.4,
} as const;

/**
 * Create a file size report row with the current and baseline runs
 */
export function createReportMetricRow(
  key: string,
  current: number,
  baseline = BASELINE_VALUE,
): ReportMetricRow {
  return {
    key,
    label: key,
    biggerIsBetter: METRIC_TYPE.biggerIsBetter,
    changed: current !== baseline,
    runs: [
      getMetricRunInfo(METRIC_TYPE, current, baseline) as MetricRunInfo,
      getMetricRunInfo(METRIC_TYPE, baseline),
    ],
  };
}
