import { SOURCE_PATHS } from '../config';
import { createSummary } from './create-summary';
import * as webpack from '../webpack';
import * as lighthouse from '../lighthouse';
import * as browsertime from '../browsertime';
import { BudgetConfig, JobData, JobMetricsSource, MetricRunInfo, SourceData } from '../constants';
import { getGlobalMetricType, getMetricRunInfo } from '../utils';
import { evaluate } from '../budgets';

interface SourceResult {
  meta: {};
  insights: {};
  metrics: JobMetricsSource;
}

interface SourceModule {
  SUMMARY_METRIC_PATHS: Array<string>;
  extract: (rawData: any, baseline: any) => any;
}

const SOURCE_MODULES: Record<string, SourceModule> = { webpack, lighthouse, browsertime };

export const createJob = (
  source: SourceData,
  baseline?: JobData,
  budgetConfigs?: Array<BudgetConfig>,
): JobData => {
  const job: JobData = {};

  SOURCE_PATHS.forEach((sourcePath) => {
    const rawData = source[sourcePath];

    if (!rawData) {
      return;
    }

    const sourceModule = SOURCE_MODULES[sourcePath];

    if (!sourceModule) {
      return;
    }

    // 1. Get data
    const extractedData: SourceResult = sourceModule.extract(rawData, baseline);

    const summary = createSummary(
      SOURCE_MODULES[sourcePath].SUMMARY_METRIC_PATHS,
      baseline?.metrics?.[sourcePath],
      extractedData?.metrics,
    );

    // 2. Evaluate budgets
    const summaryData: Record<string, Record<string, MetricRunInfo>> = {
      [sourcePath]: {},
    };

    Object.entries(summary).forEach(([id, summaryItem]) => {
      const metric = getGlobalMetricType(`${sourcePath}.${id}`);
      const runInfo = getMetricRunInfo(metric, summaryItem.current, summaryItem.baseline);
      summaryData[sourcePath][id] = runInfo;
    });

    const budgets = budgetConfigs?.map((budgetConfig) => evaluate(budgetConfig, summaryData));

    // 3. Add data to job object
    if (job.meta) {
      job.meta[sourcePath] = extractedData.meta;
    } else {
      job.meta = { [sourcePath]: extractedData.meta };
    }

    if (job.insights) {
      job.insights[sourcePath] = extractedData.insights;
    } else {
      job.insights = { [sourcePath]: extractedData.insights };
    }

    if (job.summary) {
      job.summary[sourcePath] = summary;
    } else {
      job.summary = { [sourcePath]: summary };
    }

    if (budgets) {
      if (job.budgets) {
        job.budgets[sourcePath] = budgets;
      } else {
        job.budgets = { [sourcePath]: budgets };
      }
    }

    if (job.metrics) {
      job.metrics[sourcePath] = extractedData.metrics;
    } else {
      job.metrics = { [sourcePath]: extractedData.metrics };
    }

    if (job.rawData) {
      job.rawData[sourcePath] = rawData;
    } else {
      job.rawData = { [sourcePath]: rawData };
    }
  });

  return job;
};
