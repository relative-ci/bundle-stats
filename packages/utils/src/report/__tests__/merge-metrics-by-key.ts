import { mergeMetricsByKey } from '../merge-metrics-by-key';

describe('merge metrics by keys', () => {
  it('should return rows', () => {
    const actual = mergeMetricsByKey([
      {
        metric1: { value: 100 },
        metric2: { value: 10 },
        metric4: { value: 100 },
      },
      {
        metric1: { value: 110 },
        metric3: { value: 10 },
        metric4: { value: 100 },
      },
    ]);

    expect(actual).toEqual([
      {
        key: 'metric1',
        runs: [{ value: 100 }, { value: 110 }],
      },
      {
        key: 'metric2',
        runs: [{ value: 10 }, { value: 0 }],
      },
      {
        key: 'metric4',
        runs: [{ value: 100 }, { value: 100 }],
      },
      {
        key: 'metric3',
        runs: [{ value: 0 }, { value: 10 }],
      },
    ]);
  });
});
