import resolveMetricChanged from '../resolve-metric-changed';

describe('Resolve metric changes', () => {
  it('should identify changed on one run', () => {
    const expected = resolveMetricChanged([
      {
        runs: [
          { value: 10 },
          { value: 20 },
          { value: 10 },
        ],
      },
    ]);

    expect(expected).toEqual([
      {
        changed: true,
        runs: [
          { value: 10 },
          { value: 20 },
          { value: 10 },
        ],
      },
    ]);
  });

  it('should identify changes on multiple runs', () => {
    const expected = resolveMetricChanged([
      {
        runs: [
          { value: 10 },
          { value: 20 },
          { value: 10 },
        ],
      },
      {
        runs: [
          { value: 10 },
          { value: 10 },
          { value: 10 },
        ],
      },
    ]);

    expect(expected).toEqual([
      {
        changed: true,
        runs: [
          { value: 10 },
          { value: 20 },
          { value: 10 },
        ],
      },
      {
        changed: false,
        runs: [
          { value: 10 },
          { value: 10 },
          { value: 10 },
        ],
      },
    ]);
  });
});
