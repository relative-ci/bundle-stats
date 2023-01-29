import merge from 'lodash/merge';

import { createSummary } from './create-summary';
import * as webpack from '../webpack';
import * as lighthouse from '../lighthouse';
import * as browsertime from '../browsertime';
import { JobData, JobMetricsSource, Source, SourceData } from '../constants';

interface SourceResult {
  meta: {};
  insights: {};
  metrics: JobMetricsSource;
}

interface SourceModule {
  SUMMARY_METRIC_PATHS: Array<string>;
  extract: (rawData: any, balien: any) => any;
}

const SOURCE_MODULES: Record<string, SourceModule> = { webpack, lighthouse, browsertime };

export const createJob = (source: SourceData, baseline?: JobData): JobData =>
  Object.values(Source).reduce((agg, sourcePath) => {
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
      metrics: {
        [sourcePath]: extractedData.metrics,
      },
      rawData: {
        [sourcePath]: rawData,
      },
    });
  }, {});
