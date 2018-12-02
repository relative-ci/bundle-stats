import { getMetricChanged } from '../get-metric-changed';

describe('Metric changed', () => {
  it('should return true if value is different', () => {
    const actual = getMetricChanged([
      {
        value: 100,
      },
      {
        value: 99,
      },
    ]);

    expect(actual).toBe(true);
  });

  it('should return true if baseline is null', () => {
    const actual = getMetricChanged([
      null,
      {
        value: 99,
      },
    ]);

    expect(actual).toBe(true);
  });

  it('should return true if current is null', () => {
    const actual = getMetricChanged([
      {
        value: 100,
      },
      null,
    ]);

    expect(actual).toBe(true);
  });

  it('should return false if value is the same', () => {
    const actual = getMetricChanged([
      {
        value: 100,
      },
      {
        value: 100,
      },
    ]);

    expect(actual).toBe(false);
  });
});
