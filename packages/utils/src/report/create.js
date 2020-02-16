import { get, isEmpty } from 'lodash';

import { SOURCE_PATHS } from '../config';
import { getMetricType, getMetricRunInfo } from '../utils/metrics';
import * as webpack from '../webpack';

export const createReport = (jobs) => {
  const insights = get(jobs, '[0].insights');

  const summary = SOURCE_PATHS.reduce((agg, sourceId) => {
    const sourceSummary = get(jobs, [0, 'summary', sourceId]);

    const output = Object.entries(sourceSummary).map(([metricId, summaryData]) => {
      const metric = getMetricType(`${sourceId}.${metricId}`);
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
    runs: jobs.map(({ internalBuildNumber, meta }) => ({
      ...meta,
      internalBuildNumber,
    })),

    summary,

    // Add insights if available
    ...!isEmpty(insights) ? { insights } : {},

    // Add webpack sections comparisons
    ...webpack.SECTIONS.reduce((agg, section) => ({
      ...agg,
      [section]: webpack.compare[section](jobs),
    }), {}),
  };
};
