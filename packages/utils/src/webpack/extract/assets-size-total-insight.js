import { InsightType } from '../../constants';
import { getMetricRunInfo } from '../../utils/metrics';
import { getMetricType } from '../utils';
import { Metric } from '../types';

const getText = ({ metric, displayValue, displayDeltaPercentage }) =>
  `${metric} — ${displayValue} (${displayDeltaPercentage}).`;

export const extractAssetsSizeTotalInsight = (_, currentExtractedData, baselineBundleStats) => {
  const currentValue = currentExtractedData?.metrics?.[Metric.BUNDLE_SIZE]?.value || 0;
  const baselineValue = baselineBundleStats?.metrics?.webpack?.[Metric.BUNDLE_SIZE]?.value || 0;

  const metric = getMetricType(Metric.BUNDLE_SIZE);
  const info = getMetricRunInfo(metric, currentValue, baselineValue);
  const { displayDeltaPercentage, displayValue } = info;

  return {
    insights: {
      assetsSizeTotal: {
        type: InsightType.INFO,
        data: {
          text: getText({ metric: metric.label, displayValue, displayDeltaPercentage }),
          md: getText({
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
