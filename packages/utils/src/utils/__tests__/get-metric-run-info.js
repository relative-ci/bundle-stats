import { getMetricRunInfo, getGlobalMetricType } from '../metrics';

describe('utils / metrics / getMetricRunInfo', () => {
  test('should return the info', () => {
    const metric = getGlobalMetricType('webpack.assets.totalSizeByTypeALL');
    const info = getMetricRunInfo(metric, 11000, 10000);
    const infoWithoutBaseline = getMetricRunInfo(metric, 10000);
    const infoWithSlightlyNegativeDelta = getMetricRunInfo(metric, 10001, 10000);
    const infoWithOverlyPositiveDelta = getMetricRunInfo(metric, 4000, 10000);

    expect({
      info,
      infoWithoutBaseline,
      infoWithSlightlyNegativeDelta,
      infoWithOverlyPositiveDelta,
    }).toMatchSnapshot();
  });
});
