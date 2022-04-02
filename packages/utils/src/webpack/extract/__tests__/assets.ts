import { extractAssets } from '../assets';

describe('Webpack/extract/assets', () => {
  test('should return empty', () => {
    const actual = extractAssets({});
    expect(actual).toEqual({ metrics: { assets: {} } });
  });

  test('should return metrics', () => {
    const actual = extractAssets({
      assets: [
        {
          name: 'js/main.bc22113.js',
          size: 100,
        },
        {
          name: 'css/app.22929ab.css',
          size: 100,
        },
        {
          name: 'css/app.22929ab.css.map',
          size: 100,
        },
        {
          name: 'img/logo.1211a12.png',
          size: 10,
        },
        {
          name: 'js/main.bc22113.LICENSE.txt',
          size: 10,
        },
      ],
      chunks: [
        {
          entry: true,
          id: '1',
          initial: true,
          files: ['js/main.bc22113.js'],
          names: ['main'],
        },
        {
          entry: false,
          id: '2',
          initial: false,
          files: ['css/app.22929ab.css'],
          names: ['app'],
        },
      ],
      entrypoints: {
        main: {
          assets: ['js/main.bc22113.js'],
        },
      },
    });

    const expected = {
      meta: {
        chunks: [
          {
            id: '1',
            name: 'main',
          },
          {
            id: '2',
            name: 'app',
          },
        ],
      },
      metrics: {
        assets: {
          'js/main.js': {
            name: 'js/main.bc22113.js',
            value: 100,
            isEntry: true,
            isInitial: true,
            isChunk: true,
            chunkId: '1',
          },
          'css/app.css': {
            name: 'css/app.22929ab.css',
            value: 100,
            isEntry: false,
            isInitial: false,
            isChunk: true,
            chunkId: '2',
          },
          'img/logo.png': {
            name: 'img/logo.1211a12.png',
            value: 10,
            isEntry: false,
            isInitial: false,
            isChunk: false,
          },
        },
      },
    };

    expect(actual).toEqual(expected);
  });

  test('should extract entry flag from webpack5 structure', () => {
    const actual = extractAssets({
      assets: [
        {
          name: 'js/main.bc22113.js',
          size: 100,
        },
      ],
      chunks: [
        {
          entry: true,
          id: '1',
          initial: true,
          files: ['js/main.bc22113.js'],
          names: ['main'],
        },
      ],
      entrypoints: {
        main: {
          assets: [{ name: 'js/main.bc22113.js' }],
        },
      },
    });

    const expected = {
      meta: {
        chunks: [
          {
            id: '1',
            name: 'main',
          },
        ],
      },
      metrics: {
        assets: {
          'js/main.js': {
            name: 'js/main.bc22113.js',
            value: 100,
            isEntry: true,
            isInitial: true,
            isChunk: true,
            chunkId: '1',
          },
        },
      },
    };

    expect(actual).toEqual(expected);
  });

  test('should return metrics when chunks and entrypoints are missing', () => {
    const actual = extractAssets({
      assets: [
        {
          name: 'js/main.bc22113.js',
          size: 100,
        },
        {
          name: 'css/app.22929ab.css',
          size: 100,
        },
        {
          name: 'css/app.22929ab.css.map',
          size: 100,
        },
      ],
    });

    const expected = {
      metrics: {
        assets: {
          'js/main.js': {
            name: 'js/main.bc22113.js',
            value: 100,
            isEntry: false,
            isInitial: false,
            isChunk: false,
          },
          'css/app.css': {
            name: 'css/app.22929ab.css',
            value: 100,
            isEntry: false,
            isInitial: false,
            isChunk: false,
          },
        },
      },
    };

    expect(actual).toEqual(expected);
  });

  test('should return metrics when a query is in the file name', () => {
    const actual = extractAssets({
      assets: [
        {
          name: 'js/main.bc22113.js?test=abcd',
          size: 100,
        },
        {
          name: 'css/app.22929ab.css?test=abcd',
          size: 100,
        },
        {
          name: 'css/app.22929ab.css.map',
          size: 100,
        },
        {
          name: 'img/logo.1211a12.png?test=abcd&test2=dcba',
          size: 10,
        },
        {
          name: 'js/main.bc22113.LICENSE.txt',
          size: 10,
        },
      ],
      chunks: [
        {
          entry: true,
          id: 1,
          initial: true,
          files: ['js/main.bc22113.js?test=abcd'],
          names: ['main'],
        },
        {
          entry: false,
          id: 2,
          initial: false,
          files: ['css/app.22929ab.css?test=abcd'],
          names: ['app'],
        },
      ],
      entrypoints: {
        main: {
          assets: ['js/main.bc22113.js?test=abcd'],
        },
      },
    });

    const expected = {
      meta: {
        chunks: [
          {
            id: '1',
            name: 'main',
          },
          {
            id: '2',
            name: 'app',
          },
        ],
      },
      metrics: {
        assets: {
          'js/main.js': {
            name: 'js/main.bc22113.js',
            value: 100,
            isEntry: true,
            isInitial: true,
            isChunk: true,
            chunkId: '1',
          },
          'css/app.css': {
            name: 'css/app.22929ab.css',
            value: 100,
            isEntry: false,
            isInitial: false,
            isChunk: true,
            chunkId: '2',
          },
          'img/logo.png': {
            name: 'img/logo.1211a12.png',
            value: 10,
            isEntry: false,
            isInitial: false,
            isChunk: false,
          },
        },
      },
    };

    expect(actual).toEqual(expected);
  });
});
