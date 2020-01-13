import { omit } from 'lodash';

import { METRIC_TYPE_FILE_SIZE } from '../../config/metrics';
import { getMetricType } from '../metrics';

describe('getMetricType', () => {
  test('should return metric', () => {
    expect(omit(getMetricType('webpack.totalSizeByTypeALL'), ['formatter'])).toEqual(omit({
      label: 'Total Bundle Size',
      description: 'Sum of all assets.',
      type: 'METRIC_TYPE_FILE_SIZE',
      biggerIsBetter: false,
    }, ['formatter']));

    expect(omit(getMetricType('webpack.sizes.totalSizeByTypeJS'), ['formatter'])).toEqual(omit({
      label: 'JS',
      type: 'METRIC_TYPE_FILE_SIZE',
      biggerIsBetter: false,
    }, ['formatter']));
  });

  test('should return fallback metric for partial matches', () => {
    expect(omit(getMetricType('webpack', METRIC_TYPE_FILE_SIZE), ['formatter'])).toEqual(omit({
      label: 'webpack',
      type: 'METRIC_TYPE_FILE_SIZE',
      biggerIsBetter: false,
    }, ['formatter']));
  });

  test('should return fallback metric', () => {
    expect(omit(getMetricType('/assets/main.js', METRIC_TYPE_FILE_SIZE), ['formatter'])).toEqual(omit({
      label: '/assets/main.js',
      type: 'METRIC_TYPE_FILE_SIZE',
      biggerIsBetter: false,
    }, ['formatter']));
  });
});
