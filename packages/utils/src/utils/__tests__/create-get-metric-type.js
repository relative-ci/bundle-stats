import { METRIC_TYPE_FILE_SIZE } from '../../config/metrics';
import { createGetMetricType } from '../metrics';

import { metrics } from '../../webpack/metrics';

describe('getMetricType', () => {
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
    expect(createGetMetricType(metrics)('sizes', METRIC_TYPE_FILE_SIZE)).toMatchObject({
      label: 'sizes',
      type: 'METRIC_TYPE_FILE_SIZE',
      biggerIsBetter: false,
    });
  });

  test('should return fallback metric', () => {
    expect(createGetMetricType(metrics)('/assets/main.js', METRIC_TYPE_FILE_SIZE)).toMatchObject({
      label: '/assets/main.js',
      type: 'METRIC_TYPE_FILE_SIZE',
      biggerIsBetter: false,
    });
  });
});
