import { round } from './round';

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

export function formatFileSize(value?: number | null): string {
  let unit = FILE_SIZE.BYTE;

  if (typeof value !== 'number') {
    return `0${unit.symbol}`;
  }

  if (value < FILE_SIZE.KILO.multiplier) {
    unit = FILE_SIZE.BYTE;
  } else if (value < FILE_SIZE.MEGA.multiplier) {
    unit = FILE_SIZE.KILO;
  } else {
    unit = FILE_SIZE.MEGA;
  }

  return `${round(value / unit.multiplier, 2)}${unit.symbol}`;
}
