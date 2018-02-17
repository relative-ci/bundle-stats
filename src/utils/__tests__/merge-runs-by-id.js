/* env jest/globals */
import { METRIC_TYPE_SCORE } from '../../config/metrics';
import mergeRunsById from '../merge-runs-by-id';

test('Merge runs by id', () => {
  const actual = mergeRunsById([
    {
      1: {
        type: METRIC_TYPE_SCORE,
        value: 11,
      },
      2: {
        value: 1,
      },
      3: {
        value: 1,
      },
      4: {
        value: 1,
      },
    },
    {
      1: {
        type: METRIC_TYPE_SCORE,
        value: 10
      },
      2: {
        value: 1,
      },
      3: {
        value: 1,
      },
      5: {
        value: 1,
      },
      7: {
        value: 1,
      },
    },
    {
      1: {
        type: METRIC_TYPE_SCORE,
        value: 20
      },
      2: {
        value: 1,
      },
      3: {
        value: 1,
      },
      6: {
        value: 1,
      },
      7: {
        value: 1,
      },
    },
  ]);

  const expected = [
    {
      key: '1',
      type: METRIC_TYPE_SCORE,
      runs: [
        {
          value: 11,
        },
        {
          value: 10,
        },
        {
          value: 20,
        },
      ],
    },
    {
      key: '2',
      runs: [
        { value: 1 },
        { value: 1 },
        { value: 1 },
      ],
    },
    {
      key: '3',
      runs: [
        { value: 1 },
        { value: 1 },
        { value: 1 },
      ],
    },
    {
      key: '4',
      runs: [
        { value: 1 },
        null,
        null,
      ],
    },
    {
      key: '5',
      runs: [
        null,
        { value: 1 },
        null,
      ],
    },
    {
      key: '6',
      runs: [
        null,
        null,
        { value: 1 },
      ],
    },
    {
      key: '7',
      runs: [
        null,
        { value: 1 },
        { value: 1 },
      ],
    },
  ];

  expect(actual).toEqual(expected);
});
