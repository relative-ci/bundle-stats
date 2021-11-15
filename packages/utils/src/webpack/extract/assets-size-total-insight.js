import get from 'lodash/get';
import template from 'lodash/template';

import { INSIGHT_INFO } from '../../config/insights';
import { getMetricRunInfo } from '../../utils/metrics';
import { getMetricType } from '../utils';
import { MetricId } from '../constants';

const INFO_TEMPLATE = template(
  '<%= metric %> — <%= displayValue %> (<%= displayDeltaPercentage %>).',
);

export const extractAssetsSizeTotalInsight = (
  webpackStats,
  currentExtractedData,
  baselineBundleStats,
) => {
  const currentValue = get(currentExtractedData, ['metrics', MetricId.BundleSize, 'value'], 0);
  const baselineValue = get(baselineBundleStats, ['metrics', 'webpack', MetricId.BundleSize, 'value'], 0);

  const metric = getMetricType(MetricId.BundleSize);
  const info = getMetricRunInfo(metric, currentValue, baselineValue);
  const { displayDeltaPercentage, displayValue } = info;

  return {
    insights: {
      assetsSizeTotal: {
        type: INSIGHT_INFO,
        data: {
          text: INFO_TEMPLATE({ metric: metric.label, displayValue, displayDeltaPercentage }),
          md: INFO_TEMPLATE({
            metric: `*${metric.label}*`,
            displayValue: `*${displayValue}*`,
            displayDeltaPercentage: `*${displayDeltaPercentage}*`,
          }),
          info,
        },
      },
    },
  };
};
