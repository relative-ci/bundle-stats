/* env jest/globals */
import processAssets from '../process-assets';

test('Process assets', () => {
  const actual = processAssets({
    'js/vendor.js': {
      entries: [
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
      entries: [
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
      entries: [
        {
          name: 'img/logo.000000.png',
          size: 100,
        },
        null,
      ],
    },
    'img/logo--d.png': {
      entries: [
        null,
        {
          name: 'img/logo--d.000000.png',
          size: 150,
        },
      ],
    },
    'stats.json': {
      entries: [
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
      data: {
        changed: false,
      },
      entries: [
        {
          name: 'js/vendor.000000.js',
          size: 1000,
          delta: 0,
        },
        {
          name: 'js/vendor.000000.js',
          size: 1000,
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
          size: 2000,
          delta: 33.33,
        },
        {
          name: 'js/app.000000.js',
          size: 1500,
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
          size: 100,
          delta: 100,
        },
        {},
      ],
    },
    {
      key: 'img/logo--d.png',
      data: {
        changed: true,
      },
      entries: [
        {
          delta: -100,
        },
        {
          name: 'img/logo--d.000000.png',
          size: 150,
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
          size: 0,
          delta: 0,
        },
        {
          name: 'stats.json',
          size: 0,
        },
      ],
    },
  ];

  expect(actual).toEqual(expected);
});
