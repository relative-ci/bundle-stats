import { omit } from 'lodash';

import { getMetricType } from '../get-metric-type';

test('getMetric', () => {
  expect(omit(getMetricType('webpack.assets.totalSizeByTypeALL'), ['formatter'])).toEqual(omit({
    label: 'Total Size',
    type: 'METRIC_TYPE_FILE_SIZE',
    biggerIsBetter: false,
  }, ['formatter']));
});
