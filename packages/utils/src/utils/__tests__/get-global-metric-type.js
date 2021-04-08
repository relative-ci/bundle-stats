import omit from 'lodash/omit';

import { METRIC_TYPE_FILE_SIZE } from '../../config/metrics';
import { getGlobalMetricType } from '../metrics';

describe('getGlobalMetricType', () => {
  test('should return metric', () => {
    expect(omit(getGlobalMetricType('webpack.totalSizeByTypeALL'), ['formatter'])).toEqual(
      omit(
        {
          label: 'Bundle Size',
          description: 'Sum of all assets emitted by webpack.',
          url: 'https://relative-ci.com/documentation/metrics-and-data#assets',
          type: 'METRIC_TYPE_FILE_SIZE',
          biggerIsBetter: false,
        },
        ['formatter'],
      ),
    );

    expect(omit(getGlobalMetricType('webpack.sizes.totalSizeByTypeJS'), ['formatter'])).toEqual(
      omit(
        {
          label: 'JS',
          type: 'METRIC_TYPE_FILE_SIZE',
          biggerIsBetter: false,
        },
        ['formatter'],
      ),
    );
  });

  test('should return fallback metric for partial matches', () => {
    expect(omit(getGlobalMetricType('webpack', METRIC_TYPE_FILE_SIZE), ['formatter'])).toEqual(
      omit(
        {
          label: 'webpack',
          type: 'METRIC_TYPE_FILE_SIZE',
          biggerIsBetter: false,
        },
        ['formatter'],
      ),
    );
  });

  test('should return fallback metric', () => {
    expect(
      omit(getGlobalMetricType('/assets/main.js', METRIC_TYPE_FILE_SIZE), ['formatter']),
    ).toEqual(
      omit(
        {
          label: '/assets/main.js',
          type: 'METRIC_TYPE_FILE_SIZE',
          biggerIsBetter: false,
        },
        ['formatter'],
      ),
    );
  });
});
