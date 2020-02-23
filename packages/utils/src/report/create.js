import { get, isEmpty } from 'lodash';

import { SOURCE_PATHS } from '../config';
import { getGlobalMetricType, getMetricRunInfo } from '../utils/metrics';
import * as webpack from '../webpack';
import { version } from '../../package.json';

export const createReport = (jobs) => {
  const insights = get(jobs, '[0].insights');

  const summary = SOURCE_PATHS.reduce((agg, sourceId) => {
    const sourceSummary = get(jobs, [0, 'summary', sourceId]);

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
    ...!isEmpty(insights) ? { insights } : {},

    // Add webpack sections comparisons
    ...webpack.compare(jobs),
  };
};
