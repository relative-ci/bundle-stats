import round from 'lodash/round';

const FILE_SIZE = {
  BYTE: {
    symbol: 'B',
    multiplier: 1,
  },
  KILO: {
    symbol: 'KiB',
    multiplier: 1024,
  },
  MEGA: {
    symbol: 'MiB',
    multiplier: 1024 * 1024,
  },
};

const DURATION = {
  MILISECOND: {
    symbol: 'ms',
    multiplier: 1,
  },
  SECOND: {
    symbol: 's',
    multiplier: 1000,
  },
  MINUTE: {
    symbol: 'min',
    multiplier: 60 * 1000,
  },
};

export function formatFileSize(val?: number | null): string {
  let unit = FILE_SIZE.BYTE;

  if (typeof val !== 'number') {
    return `0${unit.symbol}`;
  }

  if (val < FILE_SIZE.KILO.multiplier) {
    unit = FILE_SIZE.BYTE;
  } else if (val < FILE_SIZE.MEGA.multiplier) {
    unit = FILE_SIZE.KILO;
  } else {
    unit = FILE_SIZE.MEGA;
  }

  return `${round(val / unit.multiplier, 2)}${unit.symbol}`;
}

export function formatDuration(val?: number | null): string {
  let unit = DURATION.MILISECOND;

  if (typeof val !== 'number') {
    return `0${unit.symbol}`;
  }

  if (val < DURATION.SECOND.multiplier) {
    unit = DURATION.MILISECOND;
  } else if (val < DURATION.MINUTE.multiplier) {
    unit = DURATION.SECOND;
  } else {
    unit = DURATION.MINUTE;
  }

  return `${round(val / unit.multiplier, 1)}${unit.symbol}`;
}

export function formatNumber(val?: number | null): string {
  if (typeof val !== 'number') {
    return '0';
  }

  return val.toString();
}

export function formatCommit(commitSha?: string): string {
  if (!commitSha) {
    return '';
  }

  return commitSha.substr(0, 7);
}

export function formatPercentage(val?: number | null):string {
  if (typeof val !== 'number') {
    return '0%';
  }

  return `${val}%`;
}
