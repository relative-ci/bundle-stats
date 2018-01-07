/* env jest/globals */
import processAssets from '../process-assets';

test('Process assets', () => {
  const actual = processAssets({
    'js/vendor.js': {
      entries: [
        {
          source: 'js/vendor.js',
          name: 'js/vendor.000000.js',
          size: 1000,
        },
        {
          source: 'js/vendor.js',
          name: 'js/vendor.000000.js',
          size: 1000,
        },
      ],
    },
    'js/app.js': {
      entries: [
        {
          source: 'js/app.js',
          name: 'js/app.000001.js',
          size: 2000,
        },
        {
          source: 'js/app.js',
          name: 'js/app.000000.js',
          size: 1500,
        },
      ],
    },
    'img/logo.png': {
      entries: [
        {
          source: 'img/logo.png',
          name: 'img/logo.000000.png',
          size: 100,
        },
        null
      ],
    },
    'stats.json': {
      entries: [
        {
          source: 'stats.json',
          name: 'stats.json',
          size: 0,
        },
        {
          source: 'stats.json',
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
        added: false,
        deleted: false,
      },
      entries: [
        {
          source: 'js/vendor.js',
          name: 'js/vendor.000000.js',
          size: 1000,
        },
        {
          source: 'js/vendor.js',
          name: 'js/vendor.000000.js',
          size: 1000,
        },
      ],
    },
    {
      key: 'js/app.js',
      data: {
        changed: true,
        added: false,
        deleted: false,
      },
      entries: [
        {
          source: 'js/app.js',
          name: 'js/app.000001.js',
          size: 2000,
        },
        {
          source: 'js/app.js',
          name: 'js/app.000000.js',
          size: 1500,
        },
      ],
    },
    {
      key: 'img/logo.png',
      data: {
        changed: true,
        added: true,
        deleted: false,
      },
      entries: [
        {
          source: 'img/logo.png',
          name: 'img/logo.000000.png',
          size: 100,
        },
        null,
      ],
    },
    {
      key: 'stats.json',
      data: {
        changed: false,
        added: false,
        deleted: false,
      },
      entries: [
        {
          source: 'stats.json',
          name: 'stats.json',
          size: 0,
        },
        {
          source: 'stats.json',
          name: 'stats.json',
          size: 0,
        },
      ],
    },
  ];

  expect(actual).toEqual(expected);
});
