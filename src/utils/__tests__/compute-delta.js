/* env jest/globals */
import computeDelta from '../compute-delta';

test('Format data set', () => {
  const actual = computeDelta([
    {
      key: 'js/vendor.js',
      data: {
        changed: true,
      },
      entries: [
        {
          name: 'js/vendor.000000.js',
          value: 800,
        },
        {
          name: 'js/vendor.000000.js',
          value: 1000,
        },
      ],
    },
    {
      key: 'js/app.js',
      data: {
        changed: true,
      },
      entries: [
        {
          name: 'js/app.000001.js',
          value: 2000,
        },
        {
          name: 'js/app.000000.js',
          value: 1500,
        },
      ],
    },
    {
      key: 'img/logo.png',
      data: {
        changed: true,
      },
      entries: [
        {
          name: 'img/logo.000000.png',
          value: 100,
        },
        {
          value: 0,
        },
      ],
    },
    {
      key: 'img/logo--d.png',
      data: {
        changed: true,
      },
      entries: [
        {
          value: 0,
        },
        {
          name: 'img/logo--d.000000.png',
          value: 150,
        },
      ],
    },
    {
      key: 'stats.json',
      data: {
        changed: false,
      },
      entries: [
        {
          name: 'stats.json',
          value: 0,
        },
        {
          name: 'stats.json',
          value: 0,
        },
      ],
    },
  ]);

  const expected = [
    {
      key: 'js/vendor.js',
      data: {
        changed: true,
      },
      entries: [
        {
          name: 'js/vendor.000000.js',
          value: 800,
        },
        {
          name: 'js/vendor.000000.js',
          value: 1000,
          delta: 25,
        },
      ],
    },
    {
      key: 'js/app.js',
      data: {
        changed: true,
      },
      entries: [
        {
          name: 'js/app.000001.js',
          value: 2000,
        },
        {
          name: 'js/app.000000.js',
          value: 1500,
          delta: -25,
        },
      ],
    },
    {
      key: 'img/logo.png',
      data: {
        changed: true,
      },
      entries: [
        {
          name: 'img/logo.000000.png',
          value: 100,
        },
        {
          value: 0,
          delta: -100,
        },
      ],
    },
    {
      key: 'img/logo--d.png',
      data: {
        changed: true,
      },
      entries: [
        {
          value: 0,
        },
        {
          name: 'img/logo--d.000000.png',
          value: 150,
          delta: 100,
        },
      ],
    },
    {
      key: 'stats.json',
      data: {
        changed: false,
      },
      entries: [
        {
          name: 'stats.json',
          value: 0,
        },
        {
          name: 'stats.json',
          value: 0,
          delta: 0,
        },
      ],
    },
  ];

  expect(actual).toEqual(expected);
});
