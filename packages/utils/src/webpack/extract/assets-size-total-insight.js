import { INSIGHT_INFO } from '../../config/insights';
import { getMetricRunInfo } from '../../utils/metrics';
import { getMetricType } from '../utils';

const METRIC_NAME = 'totalSizeByTypeALL';

const getText = ({ metric, displayValue, displayDeltaPercentage }) =>
  `${metric} — ${displayValue} (${displayDeltaPercentage}).`;

export const extractAssetsSizeTotalInsight = (_, currentExtractedData, baselineBundleStats) => {
  const currentValue = currentExtractedData?.metrics?.[METRIC_NAME]?.value || 0;
  const baselineValue = baselineBundleStats?.metrics?.webpack?.[METRIC_NAME]?.value || 0;

  const metric = getMetricType(METRIC_NAME);
  const info = getMetricRunInfo(metric, currentValue, baselineValue);
  const { displayDeltaPercentage, displayValue } = info;

  return {
    insights: {
      assetsSizeTotal: {
        type: INSIGHT_INFO,
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
