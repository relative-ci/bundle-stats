import { METRIC_TYPE_SCORE } from '../../config/metrics';
import getMetric from '../metrics';

describe('getMetric', () => {
  test('should get metric from config', () => {
    const actual = getMetric('webpack.totalSizeByTypeALL');
    const expected = {
      label: 'Total Size',
      biggerIsBetter: false,
    };

    expect(actual.label).toBe(expected.label);
    expect(actual.biggerIsBetter).toBe(expected.biggerIsBetter);
    expect(typeof actual.formatter).toBe('function');
  });

  test('should get default for not configed metrics', () => {
    const actual = getMetric('main.js');
    const expected = {
      label: 'main.js',
      biggerIsBetter: false,
    };

    expect(actual.label).toBe(expected.label);
    expect(actual.biggerIsBetter).toBe(expected.biggerIsBetter);
    expect(typeof actual.formatter).toBe('function');
  });

  test('should override custom metrics', () => {
    const actual = getMetric('main.js', METRIC_TYPE_SCORE);
    const expected = {
      label: 'main.js',
      biggerIsBetter: true,
    };

    expect(actual.label).toBe(expected.label);
    expect(actual.biggerIsBetter).toBe(expected.biggerIsBetter);
    expect(typeof actual.formatter).toBe('function');
  });
});
