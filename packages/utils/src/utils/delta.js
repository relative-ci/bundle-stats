import { round } from 'lodash';

export const getDelta = (baseline, current) => {
  const baselineValue = (baseline && baseline.value) || 0;
  const currentValue = (current && current.value) || 0;

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
};

export const formatDelta = (value, formatter) => {
  // eslint-disable-next-line no-nested-ternary
  let sign = value > 0
    ? '+'
    : (value < 0 ? '-' : '');

  let absValue = Math.abs(value);

  if (absValue > 0 && absValue < 0.01) {
    sign = `~${sign}`;
    absValue = 0.01;
  }

  if (absValue > 0.01) {
    absValue = round(absValue, 2);
  }

  return `${sign}${formatter(absValue)}`;
};
