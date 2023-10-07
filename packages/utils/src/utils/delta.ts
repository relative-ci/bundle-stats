import round from 'lodash/round';

import type {
  MetricRun,
  MetricRunDelta,
  MetricRunInfoDeltaType,
  MetricTypeConfig,
} from '../constants';

export function getDelta(baseline?: MetricRun | null, current?: MetricRun | null): MetricRunDelta {
  const baselineValue = baseline?.value || 0;
  const currentValue = current?.value || 0;

  if (baselineValue === currentValue) {
    return {
      delta: 0,
      deltaPercentage: 0,
    };
  }

  if (baselineValue === 0) {
    return {
      delta: currentValue,
      deltaPercentage: 100,
    };
  }

  return {
    delta: currentValue - baselineValue,
    deltaPercentage: round((currentValue / baselineValue) * 100 - 100, 8),
  };
}

/**
 * Format delta output
 */
export function formatDelta(value: number, formatter: MetricTypeConfig['formatter']): string {
  let sign = '';

  if (value > 0) {
    sign = '+';
  } else if (value < 0) {
    sign = '-';
  }

  let absValue = Math.abs(value);

  if (absValue > 0 && absValue < 0.01) {
    sign = `~${sign}`;
    absValue = 0.01;
  }

  if (absValue > 0.01) {
    absValue = round(absValue, 2);
  }

  return `${sign}${formatter(absValue)}`;
}

/**
 * Get delta type
 */
export function getDeltaType(
  deltaPercentageValue: number,
  biggerIsBetter?: MetricTypeConfig['biggerIsBetter'],
): MetricRunInfoDeltaType {
  if (deltaPercentageValue < -50) {
    return biggerIsBetter ? 'HIGH_NEGATIVE' : 'HIGH_POSITIVE';
  }
  if (deltaPercentageValue < -5) {
    return biggerIsBetter ? 'NEGATIVE' : 'POSITIVE';
  }

  if (deltaPercentageValue < 0) {
    return biggerIsBetter ? 'LOW_NEGATIVE' : 'LOW_POSITIVE';
  }

  if (deltaPercentageValue === 0) {
    return 'NO_CHANGE';
  }

  if (deltaPercentageValue <= 5) {
    return biggerIsBetter ? 'LOW_POSITIVE' : 'LOW_NEGATIVE';
  }

  if (deltaPercentageValue <= 50) {
    return biggerIsBetter ? 'POSITIVE' : 'NEGATIVE';
  }

  return biggerIsBetter ? 'HIGH_POSITIVE' : 'HIGH_NEGATIVE';
}
