import { getMetricRunInfo, getGlobalMetricType } from '../metrics';

const metric = getGlobalMetricType('webpack.totalSizeByTypeALL');

describe('utils / metrics / getMetricRunInfo', () => {
  test('should return metric run info', () => {
    expect(getMetricRunInfo(metric, 11264, 10240)).toEqual({
      delta: 1024,
      deltaPercentage: 10,
      deltaType: 'NEGATIVE',
      displayDelta: '+1KiB',
      displayDeltaPercentage: '+10%',
      displayValue: '11KiB',
      value: 11264,
    });
  });

  test('should return when the baseline is missing', () => {
    expect(getMetricRunInfo(metric, 10240)).toEqual({
      displayValue: '10KiB',
      value: 10240,
    });
  });

  test('should return low negative delta type', () => {
    expect(getMetricRunInfo(metric, 10496, 10240)).toEqual({
      delta: 256,
      deltaPercentage: 2.5,
      deltaType: 'LOW_NEGATIVE',
      displayDelta: '+256B',
      displayDeltaPercentage: '+2.5%',
      displayValue: '10.25KiB',
      value: 10496,
    });
  });

  test.only('should return high positive delta  type', () => {
    expect(getMetricRunInfo(metric, 4096, 10240)).toEqual({
      delta: -6144,
      deltaPercentage: -60,
      deltaType: 'HIGH_POSITIVE',
      displayDelta: '-6KiB',
      displayDeltaPercentage: '-60%',
      displayValue: '4KiB',
      value: 4096,
    });
  });
});
