import { calculateCacheInvalidation } from '../utils';

describe('Webpack/utils/calculateCacheInvalidation', () => {
  it('should return 0 when no baseline', () => {
    const actual = calculateCacheInvalidation([
      {
        key: 'main.js',
        changed: true,
        added: true,
        runs: [
          {
            name: 'main.123.js',
            value: 100,
          },
          null,
        ],
      },
      {
        key: 'vendors.js',
        changed: true,
        added: true,
        runs: [
          {
            name: 'vendors.123.js',
            value: 200,
          },
          null,
        ],
      },
    ]);

    expect(actual).toEqual(0);
  });

  it('should return cache invalidation', () => {
    const actual = calculateCacheInvalidation([
      {
        key: 'main.js',
        changed: true,
        runs: [
          {
            name: 'main.123.js',
            value: 110,
          },
          {
            name: 'main.111.js',
            value: 100,
          },
        ],
      },
      {
        key: 'vendors.js',
        runs: [
          {
            name: 'vendors.123.js',
            value: 200,
          },
          {
            name: 'vendors.123.js',
            value: 200,
          },
        ],
      },
      {
        key: 'app.css',
        changed: true,
        runs: [
          {
            name: 'app.123.css',
            value: 90,
          },
          {
            name: 'app.111.css',
            value: 100,
          },
        ],
      },
      {
        key: 'logo-old.png',
        changed: true,
        deleted: true,
        runs: [
          null,
          {
            name: 'logo-old.111.js',
            value: 50,
          },
        ],
      },
      {
        key: 'logo-new.png',
        changed: true,
        added: true,
        runs: [
          {
            name: 'logo-new.111.js',
            value: 50,
          },
          null,
        ],
      },
    ]);

    // 100 + 200 + 100 + 50 + 0 = 400
    // 110 + 200 + 90  +  0 + 50 = 400
    // 200 / 400

    expect(actual).toEqual(50);
  });

  it('should return cache invalidation when the size is the same', () => {
    const actual = calculateCacheInvalidation([
      // size didn't change, but the name changed
      {
        key: 'main.js',
        changed: true,
        runs: [
          {
            name: 'main.123.js',
            value: 100,
          },
          {
            name: 'main.111.js',
            value: 100,
          },
        ],
      },
      {
        key: 'vendors.js',
        runs: [
          {
            name: 'vendors.123.js',
            value: 200,
          },
          {
            name: 'vendors.123.js',
            value: 200,
          },
        ],
      },
      {
        key: 'app.css',
        changed: true,
        runs: [
          {
            name: 'app.123.css',
            value: 90,
          },
          {
            name: 'app.111.css',
            value: 100,
          },
        ],
      },
      {
        key: 'logo-old.png',
        changed: true,
        deleted: true,
        runs: [
          null,
          {
            name: 'logo-old.111.js',
            value: 50,
          },
        ],
      },
      {
        key: 'logo-new.png',
        changed: true,
        added: true,
        runs: [
          {
            name: 'logo-new.111.js',
            value: 50,
          },
          null,
        ],
      },
    ]);

    // 100 + 200 + 100 + 50 + 0 = 400
    // 100 + 200 + 90  +  0 + 50 = 400
    // 200 / 400

    expect(actual).toEqual(50);
  });
});
