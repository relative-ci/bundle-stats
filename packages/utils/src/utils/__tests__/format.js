import {
  formatCommit,
  formatDuration,
  formatFileSize,
  formatNumber,
  formatPercentage,
} from '../format';

describe('format', () => {
  test('formatFileSize', () => {
    expect(formatFileSize()).toEqual('0B');
    expect(formatFileSize(0)).toEqual('0B');
    expect(formatFileSize(0.1)).toEqual('0.1B');
    expect(formatFileSize(100)).toEqual('100B');
    expect(formatFileSize(100000)).toEqual('100KB');
  });

  test('formatDuration', () => {
    expect(formatDuration()).toEqual('0ms');
    expect(formatDuration(0)).toEqual('0ms');
    expect(formatDuration(0.1)).toEqual('100mu');
    expect(formatDuration(100)).toEqual('100ms');
    expect(formatDuration(2200)).toEqual('2.2s');
  });

  test('formatNumber', () => {
    expect(formatNumber(0)).toEqual('0');
    expect(formatNumber(10)).toEqual('10');
  });

  test('formatCommit', () => {
    expect(formatCommit()).toEqual('');
    expect(formatCommit('abcd1234')).toEqual('abcd123');
  });

  test('formatPercentage', () => {
    expect(formatPercentage(10)).toEqual('10%');
  });
});
