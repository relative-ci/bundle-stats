import { get, template } from 'lodash';

import {
  DELTA_TYPE_HIGH_NEGATIVE,
  DELTA_TYPE_NEGATIVE,
  DELTA_TYPE_LOW_NEGATIVE,
  DELTA_TYPE_NO_CHANGE,
  DELTA_TYPE_LOW_POSITIVE,
  DELTA_TYPE_POSITIVE,
  DELTA_TYPE_HIGH_POSITIVE,
} from '../../config/delta';
import { INSIGHT_INFO } from '../../config/insights';
import { getMetricRunInfo, getMetricType } from '../../utils/metrics';

const INCREASED = template(
  'Bundle size increased with <%= displayDelta %> (<%= displayDeltaPercentage %>).',
);
const DECREASED = template(
  'Bundle size decreased with <%= displayDelta %> (<%= displayDeltaPercentage %>).',
);
const NO_CHANGE = template('Bundle size did not change.');

const TEMPLATES = new Map([
  [DELTA_TYPE_HIGH_NEGATIVE, INCREASED],
  [DELTA_TYPE_NEGATIVE, INCREASED],
  [DELTA_TYPE_LOW_NEGATIVE, INCREASED],
  [DELTA_TYPE_NO_CHANGE, NO_CHANGE],
  [DELTA_TYPE_LOW_POSITIVE, DECREASED],
  [DELTA_TYPE_POSITIVE, DECREASED],
  [DELTA_TYPE_HIGH_POSITIVE, DECREASED],
]);

const METRIC_NAME = 'totalSizeByTypeALL';

export const extractAssetsSizeTotalInsight = (
  webpackStats, currentExtractedData, baselineBundleStats,
) => {
  const currentValue = get(currentExtractedData, ['metrics', METRIC_NAME, 'value'], 0);
  const baselineValue = get(baselineBundleStats, ['metrics', 'webpack', METRIC_NAME, 'value'], 0);

  const metric = getMetricType(['webpack', METRIC_NAME].join('.'));
  const {
    deltaType, displayDelta, displayDeltaPercentage,
  } = getMetricRunInfo(metric, currentValue, baselineValue);
  const messageTemplate = TEMPLATES.get(deltaType);

  return {
    insights: {
      assetsSizeTotal: {
        type: INSIGHT_INFO,
        data: {
          text: messageTemplate({ displayDelta, displayDeltaPercentage }),
          md: messageTemplate({
            displayDelta: `*${displayDelta}*`,
            displayDeltaPercentage: `*${displayDeltaPercentage}*`,
          }),
        },
      },
    },
  };
};
