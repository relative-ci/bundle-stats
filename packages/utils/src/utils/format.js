import configureMeasurements, { digital, time } from 'convert-units';
import round from 'lodash/round';

const convert = configureMeasurements({ digital, time });

const FILE_SIZE_UNIT = 'B';
const DURATION_UNIT = 'ms';

export const formatFileSize = (val) => {
  const res = convert(val).from(FILE_SIZE_UNIT).toBest();

  if (res) {
    return `${round(res.val, 2)}${res.unit}`;
  }

  return `${round(val || 0, 2)}${FILE_SIZE_UNIT}`;
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
