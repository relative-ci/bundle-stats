import { calculateCacheInvalidation } from '../calculate-cache-invalidation';

describe('Calculate cache invalidation', () => {
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

    // 100 + 200 + 50 + 0 = 300
    // 110 + 200 + 0 + 50 = 310
    // 100 / 300

    expect(actual).toEqual(33.33);
  });
});
