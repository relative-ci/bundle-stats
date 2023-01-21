import merge from 'lodash/merge';

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
): JobData =>
  SOURCE_PATHS.reduce((agg, sourcePath) => {
    const rawData = source[sourcePath];

    if (!rawData) {
      return agg;
    }

    const sourceModule = SOURCE_MODULES[sourcePath];

    if (!sourceModule) {
      return agg;
    }

    const extractedData: SourceResult = sourceModule.extract(rawData, baseline);

    const summary = createSummary(
      SOURCE_MODULES[sourcePath].SUMMARY_METRIC_PATHS,
      baseline?.metrics?.[sourcePath],
      extractedData?.metrics,
    );

    // Summary data payload
    const summaryData: Record<string, Record<string, MetricRunInfo>> = {
      [sourcePath]: {},
    };

    Object.entries(summary).forEach(([id, summaryItem]) => {
      const metric = getGlobalMetricType(`${sourcePath}.${id}`);
      const runInfo = getMetricRunInfo(metric, summaryItem.current, summaryItem.baseline);
      summaryData[sourcePath][id] = runInfo;
    });

    const budgets = budgetConfigs?.map((budgetConfig) => evaluate(budgetConfig, summaryData));

    return merge({}, agg, {
      meta: {
        [sourcePath]: extractedData.meta,
      },
      insights: {
        [sourcePath]: extractedData.insights,
      },
      summary: {
        [sourcePath]: summary,
      },
      budgets: {
        [sourcePath]: budgets,
      },
      metrics: {
        [sourcePath]: extractedData.metrics,
      },
      rawData: {
        [sourcePath]: rawData,
      },
    });
  }, {});
