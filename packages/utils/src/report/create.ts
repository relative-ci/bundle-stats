import isEmpty from 'lodash/isEmpty';

import { SOURCE_PATHS } from '../config';
import { getGlobalMetricType, getMetricRunInfo } from '../utils/metrics';
import * as webpack from '../webpack';
/* @ts-ignore */
import { version } from '../../package.json';

interface JobSummary {
  current: number;
  baseline: number;
}

export const createReport = (jobs: Array<any>) => {
  const insights = jobs[0]?.insights;

  const summary = SOURCE_PATHS.reduce((agg, sourceId) => {
    const sourceSummary = jobs[0]?.summary?.[sourceId] as JobSummary;

    if (!sourceSummary) {
      return agg;
    }

    const output = Object.entries(sourceSummary).map(([metricId, summaryData]) => {
      const metric = getGlobalMetricType(`${sourceId}.${metricId}`);

      const { current = 0, baseline = 0 } = summaryData;
      const info = getMetricRunInfo(metric, current, baseline);

      return {
        label: metric.label,
        ...info,
      };
    });

    return {
      ...agg,
      [sourceId]: output,
    };
  }, {});

  return {
    createdAt: new Date().toISOString(),
    version,

    runs: jobs.map(({ internalBuildNumber, meta }) => ({
      ...meta,
      internalBuildNumber,
    })),

    summary,

    // Add insights if available
    ...(!isEmpty(insights) ? { insights } : {}),

    // Add webpack sections comparisons
    ...webpack.compare(jobs),
  };
};
