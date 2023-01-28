import { createSummary } from './create-summary';
import * as webpack from '../webpack';
import * as lighthouse from '../lighthouse';
import * as browsertime from '../browsertime';
import { BudgetConfig, JobData, JobMetricsSource, JobSection, JobSectionId, MetricRunInfo, Source, SourceData } from '../constants';
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

  Object.values(Source).forEach((sourcePath) => {
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
    const dataMap = {
      [JobSectionId.meta]: extractedData.meta,
      [JobSectionId.insights]: extractedData.insights,
      [JobSectionId.summary]: summary,
      [JobSectionId.budgets]: budgets,
      [JobSectionId.metrics]: extractedData.metrics,
      [JobSectionId.rawData]: rawData,
    };

    Object.entries(dataMap).forEach(([key, data]) => {
      if (!data) {
        return;
      }

      const dataId = key as JobSectionId;

      if (!job[dataId]) {
        job[dataId] = {} as any;
      }

      (job[dataId] as JobSection)[sourcePath] = data;
    });
  });

  return job;
};
