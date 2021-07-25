import { getMetricChanged } from '../get-metric-changed';

describe('Metric changed', () => {
  it('should return true if value is different', () => {
    const actual = getMetricChanged([{ value: 100 }, { value: 99 }]);
    expect(actual).toBe(true);
  });

  it('should return true if baseline is null', () => {
    const actual = getMetricChanged([null, { value: 99 }]);
    expect(actual).toBe(true);
  });

  it('should return true if current is null', () => {
    const actual = getMetricChanged([{ value: 100 }, null]);
    expect(actual).toBe(true);
  });

  it('should return false if value is the same', () => {
    const actual = getMetricChanged([{ value: 100 }, { value: 100 }]);
    expect(actual).toBe(false);
  });

  it('should return true if value is the same but the name changed', () => {
    const actual = getMetricChanged([
      {
        name: 'main.111.js',
        value: 100,
      },
      {
        name: 'main.100.js',
        value: 100,
      },
    ]);

    expect(actual).toBe(true);
  });
});
