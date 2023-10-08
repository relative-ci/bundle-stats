import get from 'lodash/get';

import { MetricRunInfo, Metric, MetricTypes, MetricConfig, MetricTypeConfig } from '../constants';
import { METRIC_TYPE_CONFIGS } from '../config';
import { metrics as webpackMetricTypes } from '../webpack/metrics';
import { metrics as lighthouseMetricTypes } from '../lighthouse/metrics';
import { metrics as browsertimeMeticTypes } from '../browsertime/metrics';
import { formatPercentage } from './format';
import { formatDelta, getDelta, getDeltaType } from './delta';

export function createGetMetricType(metrics: Record<string, unknown>) {
  return function getMetricType(key: string, type?: MetricTypes): Metric {
    const metric = get(metrics, key) as MetricConfig;

    if (metric?.type) {
      return {
        ...METRIC_TYPE_CONFIGS[metric.type],
        ...metric,
      };
    }

    const resolvedType = type || MetricTypes.Numeric;

    return {
      ...METRIC_TYPE_CONFIGS[resolvedType],
      type: resolvedType,
      label: key,
    };
  };
}

export function getGlobalMetricType(key: string, type?: MetricTypes): Metric {
  const getMetricType = createGetMetricType({
    webpack: webpackMetricTypes,
    lighthouse: lighthouseMetricTypes,
    browsertime: browsertimeMeticTypes,
  });

  return getMetricType(key, type);
}

export function getMetricRunInfo(
  metricType: MetricTypeConfig,
  current: number,
  baseline?: number,
): MetricRunInfo {
  const { formatter, biggerIsBetter } = metricType;

  const runInfo = {
    value: current,
    displayValue: formatter(current),
  };

  // Skip computing delta fields when the baseline is missing
  if (typeof baseline === 'undefined') {
    return runInfo;
  }

  const { delta, deltaPercentage } = getDelta({ value: baseline }, { value: current });

  // Resolve regression/improvement flag
  let regression;

  if (biggerIsBetter === null) {
    regression = null;
  } else if ((biggerIsBetter === true && delta > 0) || (biggerIsBetter === false && delta < 0)) {
    regression = false;
  } else if ((biggerIsBetter === false && delta > 0) || (biggerIsBetter === true && delta < 0)) {
    regression = true;
  }

  return {
    ...runInfo,
    delta,
    deltaPercentage,
    displayDelta: formatDelta(delta, formatter),
    displayDeltaPercentage: formatDelta(deltaPercentage, formatPercentage),
    deltaType: getDeltaType(deltaPercentage, biggerIsBetter),
    ...(typeof regression !== 'undefined' && { regression }),
  };
}
