import { METRIC_TYPE_FILE_SIZE } from '../../config/metrics';
import { getGlobalMetricType } from '../metrics';

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
    expect(getGlobalMetricType('webpack', METRIC_TYPE_FILE_SIZE)).toMatchObject({
      label: 'webpack',
      type: 'METRIC_TYPE_FILE_SIZE',
      biggerIsBetter: false,
    });
  });

  test('should return fallback metric', () => {
    expect(getGlobalMetricType('/assets/main.js', METRIC_TYPE_FILE_SIZE)).toMatchObject({
      label: '/assets/main.js',
      type: 'METRIC_TYPE_FILE_SIZE',
      biggerIsBetter: false,
    });
  });
});
