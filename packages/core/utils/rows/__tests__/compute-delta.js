import computeDelta from '../compute-delta';

test('Compute delta', () => {
  const actual = computeDelta([
    {
      runs: [
        {
          value: 800,
        },
        {
          value: 1000,
        },
      ],
    },
    {
      runs: [
        {
          value: 2000,
        },
        {
          value: 1500,
        },
      ],
    },
    {
      runs: [
        {
          value: 100,
        },
        null,
      ],
    },
    {
      runs: [
        null,
        {
          value: 150,
        },
      ],
    },
    {
      runs: [
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
      runs: [
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
      runs: [
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
      runs: [
        {
          value: 100,
        },
        {
          delta: -100,
          displayDelta: '-100%',
        },
      ],
    },
    {
      runs: [
        {},
        {
          value: 150,
          delta: 100,
          displayDelta: '+100%',
        },
      ],
    },
    {
      runs: [
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
