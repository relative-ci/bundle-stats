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
    {
      runs: [
        {
          value: 100.00001,
        },
        {
          value: 100,
        },
      ],
    },
  ]);

  const expected = [
    {
      runs: [
        {
          delta: -20,
          displayDelta: '-20%',
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
          delta: 33.33333333,
          displayDelta: '+33.33%',
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
          delta: 100,
          displayDelta: '+100%',
          value: 100,
        },
        {
        },
      ],
    },
    {
      runs: [
        {
          delta: -100,
          displayDelta: '-100%',
        },
        {
          value: 150,
        },
      ],
    },
    {
      runs: [
        {
          value: 0,
          delta: 0,
          displayDelta: '0%',
        },
        {
          value: 0,
        },
      ],
    },
    {
      runs: [
        {
          value: 100.00001,
          delta: 0.00001,
          displayDelta: '~+0.01%',
        },
        {
          value: 100,
        },
      ],
    },
  ];

  expect(actual).toEqual(expected);
});
