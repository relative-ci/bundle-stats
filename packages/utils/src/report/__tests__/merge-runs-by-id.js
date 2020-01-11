import { mergeRunsById } from '../merge-runs-by-id';

describe('merge runs by ids', () => {
  it('should return rows', () => {
    const actual = mergeRunsById([
      {
        metric1: {
          value: 100,
          type: 'METRIC_TYPE_DURATION',
        },
        metric2: {
          value: 10,
          type: 'METRIC_TYPE_NUMBER',
        },
        metric4: {
          value: 100,
          type: 'METRIC_TYPE_SCORE',
        },
      },
      {
        metric1: {
          value: 110,
          type: 'METRIC_TYPE_DURATION',
        },
        metric3: {
          value: 10,
          type: 'METRIC_TYPE_FILE_SIZE',
        },
        metric4: {
          value: 100,
          type: 'METRIC_TYPE_SCORE',
        },
      },
    ]);

    expect(actual).toEqual([
      {
        key: 'metric1',
        type: 'METRIC_TYPE_DURATION',
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
        type: 'METRIC_TYPE_NUMBER',
        runs: [
          {
            value: 10,
          },
          null,
        ],
      },
      {
        key: 'metric4',
        type: 'METRIC_TYPE_SCORE',
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
        type: 'METRIC_TYPE_FILE_SIZE',
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
