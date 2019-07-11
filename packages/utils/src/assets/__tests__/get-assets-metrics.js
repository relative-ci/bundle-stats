import { getAssetsMetrics } from '../get-assets-metrics';

describe('getAssetsMetrics', () => {
  test('should return metrics when data is null', () => {
    const actual = getAssetsMetrics([
      {
        name: 'js/main.bc2211.js',
        size: 100,
      },
      {
        name: 'css/app.22929a.css',
        size: 100,
      },
      {
        name: 'css/app.22929a.css.map',
        size: 100,
      },
    ]);

    const expected = {
      'js/main.js': {
        name: 'js/main.bc2211.js',
        value: 100,
        isEntry: false,
        isInitial: false,
        isChunk: false,
      },
      'css/app.css': {
        name: 'css/app.22929a.css',
        value: 100,
        isEntry: false,
        isInitial: false,
        isChunk: false,
      },
    };

    expect(actual).toEqual(expected);
  });

  test('should return metrics when data is not null', () => {
    const actual = getAssetsMetrics([
      {
        name: 'js/main.bc2211.js',
        size: 100,
      },
      {
        name: 'css/app.22929a.css',
        size: 100,
      },
      {
        name: 'css/app.22929a.css.map',
        size: 100,
      },
    ], {
      chunks: [
        {
          entry: true,
          id: 1,
          initial: true,
          files: [
            'js/main.bc2211.js',
          ],
          names: ['main'],
        },
        {
          entry: false,
          id: 2,
          initial: false,
          files: [
            'css/app.22929a.css',
          ],
          names: ['app'],
        },
      ],
      entrypoints: {
        main: {
          assets: [
            'js/main.bc2211.js',
          ],
        },
      },
    });

    const expected = {
      'js/main.js': {
        name: 'js/main.bc2211.js',
        value: 100,
        isEntry: true,
        isInitial: true,
        isChunk: false,
      },
      'css/app.css': {
        name: 'css/app.22929a.css',
        value: 100,
        isEntry: false,
        isInitial: false,
        isChunk: true,
      },
    };

    expect(actual).toEqual(expected);
  });
});
