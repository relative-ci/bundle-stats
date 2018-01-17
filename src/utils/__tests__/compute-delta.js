/* env jest/globals */
import computeDelta from '../compute-delta';

test('Compute delta', () => {
  const actual = computeDelta([
    {
      entries: [
        {
          value: 800,
        },
        {
          value: 1000,
        },
      ],
    },
    {
      entries: [
        {
          value: 2000,
        },
        {
          value: 1500,
        },
      ],
    },
    {
      entries: [
        {
          value: 100,
        },
        {
          value: 0,
        },
      ],
    },
    {
      entries: [
        {
          value: 0,
        },
        {
          value: 150,
        },
      ],
    },
    {
      entries: [
        {
          value: 0,
        },
        {
          value: 0,
        },
      ],
    },
  ]);

  const expected = [
    {
      entries: [
        {
          value: 800,
        },
        {
          value: 1000,
          delta: 25,
          displayDelta: '+25%',
        },
      ],
    },
    {
      entries: [
        {
          value: 2000,
        },
        {
          value: 1500,
          delta: -25,
          displayDelta: '-25%',
        },
      ],
    },
    {
      entries: [
        {
          value: 100,
        },
        {
          value: 0,
          delta: -100,
          displayDelta: '-100%',
        },
      ],
    },
    {
      entries: [
        {
          value: 0,
        },
        {
          value: 150,
          delta: 100,
          displayDelta: '+100%',
        },
      ],
    },
    {
      entries: [
        {
          value: 0,
        },
        {
          value: 0,
          delta: 0,
          displayDelta: '+0%',
        },
      ],
    },
  ];

  expect(actual).toEqual(expected);
});
