import get from 'lodash/get';

interface JobSummaryItem {
  baseline: number;
  current: number;
}

type JobSummary = Record<string, JobSummaryItem>;

export const createSummary = (
  metricPaths: Array<string>,
  baselineSourceMetrics: any,
  currentSourceMetrics: any,
): JobSummary => {
  const result: JobSummary = {};

  metricPaths.forEach((metric) => {
    result[metric] = {
      baseline: get(baselineSourceMetrics, `${metric}.value`, 0),
      current: get(currentSourceMetrics, `${metric}.value`, 0),
    };
  });

  return result;
};
