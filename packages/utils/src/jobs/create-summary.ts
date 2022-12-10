import get from 'lodash/get';

import { JobMetricsSource, JobSummaryItem } from '../constants';

type JobSummary = Record<string, JobSummaryItem>;

export const createSummary = (
  metricPaths: Array<string>,
  baselineMetricsSource: JobMetricsSource | null | undefined,
  currentMetricsSource: JobMetricsSource,
): JobSummary => {
  const result: JobSummary = {};

  metricPaths.forEach((metric) => {
    result[metric] = {
      baseline: get(baselineMetricsSource, `${metric}.value`, 0) as number,
      current: get(currentMetricsSource, `${metric}.value`, 0) as number,
    };
  });

  return result;
};
