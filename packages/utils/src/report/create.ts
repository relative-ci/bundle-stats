import isEmpty from 'lodash/isEmpty';

import { MetricRunInfo, Job, JobSummarySource, Source } from '../constants';
import { getGlobalMetricType, getMetricRunInfo } from '../utils/metrics';
import * as webpack from '../webpack';
/* @ts-ignore */
import { version } from '../../package.json';

interface ReportMetricRunInfo extends MetricRunInfo {
  label: string;
}

type ReportSummary = Record<string, Array<ReportMetricRunInfo>>;

interface JobRun {
  internalBuildNumber: number;
}

interface Report {
  createdAt: string;
  version: string;
  summary: ReportSummary;
  runs: Array<JobRun>;
}

export const createReport = (jobs: Array<Job>): Report => {
  const insights = jobs[0]?.insights;

  // Add summary report data
  const summary: Record<string, Array<ReportMetricRunInfo>> = {};

  Object.values(Source).forEach((source) => {
    const sourceSummary = jobs[0]?.summary?.[source] as JobSummarySource;

    if (!sourceSummary) {
      return;
    }

    const summaryEntries = Object.entries(sourceSummary).map(([metricId, summaryData]) => {
      const metric = getGlobalMetricType(`${source}.${metricId}`);
      const { current = 0, baseline = 0 } = summaryData;
      const data = getMetricRunInfo(metric, current, baseline);

      return Object.assign(data, { label: metric.label });
    });

    summary[source] = summaryEntries;
  }, {});

  const sectionsData = webpack.compare(jobs);

  return Object.assign(sectionsData, {
    createdAt: new Date().toISOString(),
    version,

    runs: jobs.map(({ internalBuildNumber, meta }) => ({
      ...meta,
      internalBuildNumber,
    })),

    summary,

    // Add insights if available
    ...(!isEmpty(insights) ? { insights } : {}),
  });
};
