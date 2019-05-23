import { omit } from 'lodash';

import { getMetric } from '../metrics';

test('getMetric', () => {
  expect(omit(getMetric('webpack.assets.totalSizeByTypeALL'), ['formatter'])).toEqual(omit({
    label: 'Total Size',
    type: 'METRIC_TYPE_FILE_SIZE',
    biggerIsBetter: false,
  }, ['formatter']));
});
