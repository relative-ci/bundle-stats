/* env jest/globals */
import formatDataSet from '../format-data-set';

test('Process assets', () => {
  const actual = formatDataSet({
    'js/vendor.js': {
      runs: [
        {
          name: 'js/vendor.000000.js',
          size: 1000,
        },
        {
          name: 'js/vendor.000000.js',
          size: 1000,
        },
      ],
    },
    'js/app.js': {
      runs: [
        {
          name: 'js/app.000001.js',
          size: 2000,
        },
        {
          name: 'js/app.000000.js',
          size: 1500,
        },
      ],
    },
    'img/logo.png': {
      runs: [
        {
          name: 'img/logo.000000.png',
          size: 100,
        },
        null,
      ],
    },
    'img/logo--d.png': {
      runs: [
        null,
        {
          name: 'img/logo--d.000000.png',
          size: 150,
        },
      ],
    },
    'stats.json': {
      runs: [
        {
          name: 'stats.json',
          size: 0,
        },
        {
          name: 'stats.json',
          size: 0,
        },
      ],
    },
  });

  const expected = [
    {
      key: 'js/vendor.js',
      runs: [
        {
          name: 'js/vendor.000000.js',
          value: 1000,
        },
        {
          name: 'js/vendor.000000.js',
          value: 1000,
        },
      ],
    },
    {
      key: 'js/app.js',
      runs: [
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
      runs: [
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
      runs: [
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
      runs: [
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
  ];

  expect(actual).toEqual(expected);
});
