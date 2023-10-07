import { metrics } from '../../webpack/metrics';
import { MetricTypes } from '../../constants';
import { createGetMetricType, getGlobalMetricType, getMetricRunInfo } from '../metrics';
import { METRIC_TYPE_CONFIGS } from '../../config';

describe('utils / metrics', () => {
  describe('createGetMetricType', () => {
    test('should return metric', () => {
      expect(createGetMetricType(metrics)('totalSizeByTypeALL')).toMatchObject({
        label: 'Bundle Size',
        url: 'https://relative-ci.com/documentation/metrics-and-data#assets',
        type: 'METRIC_TYPE_FILE_SIZE',
        biggerIsBetter: false,
      });

      expect(createGetMetricType(metrics)('sizes.totalSizeByTypeJS')).toMatchObject({
        label: 'JS',
        type: 'METRIC_TYPE_FILE_SIZE',
        biggerIsBetter: false,
      });
    });

    test('should return fallback metric for partial matches', () => {
      expect(createGetMetricType(metrics)('sizes', MetricTypes.FileSize)).toMatchObject({
        label: 'sizes',
        type: 'METRIC_TYPE_FILE_SIZE',
        biggerIsBetter: false,
      });
    });

    test('should return fallback metric', () => {
      expect(createGetMetricType(metrics)('/assets/main.js', MetricTypes.FileSize)).toMatchObject({
        label: '/assets/main.js',
        type: 'METRIC_TYPE_FILE_SIZE',
        biggerIsBetter: false,
      });
    });
  });

  describe('getGlobalMetricType', () => {
    test('should return metric', () => {
      expect(getGlobalMetricType('webpack.totalSizeByTypeALL')).toMatchObject({
        label: 'Bundle Size',
        url: 'https://relative-ci.com/documentation/metrics-and-data#assets',
        type: 'METRIC_TYPE_FILE_SIZE',
        biggerIsBetter: false,
      });

      expect(getGlobalMetricType('webpack.sizes.totalSizeByTypeJS')).toMatchObject({
        label: 'JS',
        type: 'METRIC_TYPE_FILE_SIZE',
        biggerIsBetter: false,
      });
    });

    test('should return fallback metric for partial matches', () => {
      expect(getGlobalMetricType('webpack', MetricTypes.FileSize)).toMatchObject({
        label: 'webpack',
        type: 'METRIC_TYPE_FILE_SIZE',
        biggerIsBetter: false,
      });
    });

    test('should return fallback metric', () => {
      expect(getGlobalMetricType('/assets/main.js', MetricTypes.FileSize)).toMatchObject({
        label: '/assets/main.js',
        type: 'METRIC_TYPE_FILE_SIZE',
        biggerIsBetter: false,
      });
    });
  });

  describe('getMetricRunInfo', () => {
    const metric = METRIC_TYPE_CONFIGS.METRIC_TYPE_FILE_SIZE;

    test('should return metric run info', () => {
      expect(getMetricRunInfo(metric, 11264, 10240)).toEqual({
        delta: 1024,
        deltaPercentage: 10,
        deltaType: 'NEGATIVE',
        displayDelta: '+1KiB',
        displayDeltaPercentage: '+10%',
        displayValue: '11KiB',
        regression: true,
        value: 11264,
      });
    });

    test('should return when the baseline is missing', () => {
      expect(getMetricRunInfo(metric, 10240, undefined)).toEqual({
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
        regression: true,
        value: 10496,
      });
    });

    test('should return high positive delta  type', () => {
      expect(getMetricRunInfo(metric, 4096, 10240)).toEqual({
        delta: -6144,
        deltaPercentage: -60,
        deltaType: 'HIGH_POSITIVE',
        displayDelta: '-6KiB',
        displayDeltaPercentage: '-60%',
        displayValue: '4KiB',
        regression: false,
        value: 4096,
      });
    });
  });
});
