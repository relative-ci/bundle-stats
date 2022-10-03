import configureMeasurements, { time } from 'convert-units';
import round from 'lodash/round';

const convert = configureMeasurements({ time });

const FILE_SIZE_MULTIPLIERS = {
  KiB: 1024,
  MiB: 1024 * 1024,
};

const DURATION_UNIT = 'ms';

export const formatFileSize = (val) => {
  if (typeof val !== 'number') {
    return `0B`;
  }

  if (val < FILE_SIZE_MULTIPLIERS.KiB) {
    return `${val}B`;
  }

  if (val < FILE_SIZE_MULTIPLIERS.MiB) {
    return `${round(val / FILE_SIZE_MULTIPLIERS.KiB, 2)}KiB`;
  }

  return `${round(val / FILE_SIZE_MULTIPLIERS.MiB, 2)}MiB`;
};

export const formatDuration = (val) => {
  const res = convert(val).from(DURATION_UNIT).toBest();

  if (res) {
    return `${round(res.val, 4)}${res.unit}`;
  }

  return `${round(val || 0, 4)}${DURATION_UNIT}`;
};

export const formatNumber = (val) => `${val}`;

export const formatCommit = (commitSha) => (commitSha && commitSha.substr(0, 7)) || '';

export const formatPercentage = (val) => `${val}%`;
