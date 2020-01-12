import { mergeRunsById } from '../merge-runs-by-id';

describe('merge runs by ids', () => {
  it('should return rows', () => {
    const actual = mergeRunsById([
      {
        metric1: {
          value: 100,
        },
        metric2: {
          value: 10,
        },
        metric4: {
          value: 100,
        },
      },
      {
        metric1: {
          value: 110,
        },
        metric3: {
          value: 10,
        },
        metric4: {
          value: 100,
        },
      },
    ]);

    expect(actual).toEqual([
      {
        key: 'metric1',
        runs: [
          {
            value: 100,
          },
          {
            value: 110,
          },
        ],
      },
      {
        key: 'metric2',
        runs: [
          {
            value: 10,
          },
          null,
        ],
      },
      {
        key: 'metric4',
        runs: [
          {
            value: 100,
          },
          {
            value: 100,
          },
        ],
      },
      {
        key: 'metric3',
        runs: [
          null,
          {
            value: 10,
          },
        ],
      },
    ]);
  });
});
