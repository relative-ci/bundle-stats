import { createStats } from '../create';

describe('createStats', () => {
  test('should create stats when baseline is null', () => {
    const actual = createStats(null, {
      webpack: {
        stats: {
          assets: [
            {
              name: 'main.js',
              size: 40,
            },
            {
              name: 'vendors.js',
              size: 40,
            },
            {
              name: 'main.css',
              size: 10,
            },
            {
              name: 'index.html',
              size: 5,
            },
            {
              name: 'logo.png',
              size: 5,
            },
          ],
          chunks: [
            {
              id: 0,
              initial: true,
              name: 'main',
              files: [
                'main.js',
                'main.css',
              ],
            },
            {
              id: 1,
              initial: true,
              name: 'main',
              files: [
                'vendors.js',
              ],
            },
          ],
          modules: [
            {
              name: 'mod1.js',
              size: 0,
              chunks: [0],
            },
            {
              name: 'mod2.js',
              size: 1,
              chunks: [1],
            },
            {
              name: 'node_modules/package-a/dist/index.js',
              size: 10,
              chunks: [1],
            },
          ],
        },
      },
    });

    expect(actual).toEqual({
      webpack: {
        assets: {
          totalSizeByTypeALL: {
            value: 100,
          },
          totalSizeByTypeJS: {
            value: 80,
          },
          totalSizeByTypeCSS: {
            value: 10,
          },
          totalSizeByTypeFONT: {
            value: 0,
          },
          totalSizeByTypeHTML: {
            value: 5,
          },
          totalSizeByTypeIMG: {
            value: 5,
          },
          totalSizeByTypeMEDIA: {
            value: 0,
          },
          totalSizeByTypeOTHER: {
            value: 0,
          },
          totalInitialSizeJS: {
            value: 80,
          },
          totalInitialSizeCSS: {
            value: 10,
          },
        },
        cacheInvalidation: {
          value: 0,
        },
        moduleCount: {
          value: 3,
        },
        chunkCount: {
          value: 0,
        },
        assetCount: {
          value: 5,
        },
        packageCount: {
          value: 1,
        },
      },
    });
  });

  test('should create stats with baseline', () => {
    const actual = createStats(
      {
        webpack: {
          stats: {
            assets: [
              {
                name: 'main.js',
                size: 50,
              },
              {
                name: 'vendors.js',
                size: 40,
              },
              {
                name: 'main.css',
                size: 10,
              },
              {
                name: 'index.html',
                size: 5,
              },
              {
                name: 'logo.png',
                size: 5,
              },
            ],
          },
        },
      },
      {
        webpack: {
          stats: {
            assets: [
              {
                name: 'main.js',
                size: 40,
              },
              {
                name: 'vendors.js',
                size: 40,
              },
              {
                name: 'main.css',
                size: 10,
              },
              {
                name: 'index.html',
                size: 5,
              },
              {
                name: 'logo.png',
                size: 5,
              },
            ],
            modules: [
              {
                name: 'mod1.js',
                size: 0,
                chunks: [0],
              },
              {
                name: 'mod2.js',
                size: 1,
                chunks: [1],
              },
              {
                name: 'node_modules/package-a/dist/index.js',
                size: 10,
                chunks: [1],
              },
            ],
            chunks: [
              {
                id: 0,
                initial: true,
                name: 'main',
                files: [
                  'main.js',
                  'main.css',
                ],
              },
              {
                id: 1,
                initial: true,
                name: 'vendors',
                files: [
                  'vendors.js',
                ],
              },
            ],
          },
        },
      },
    );

    expect(actual).toEqual({
      webpack: {
        assets: {
          totalSizeByTypeALL: {
            value: 100,
          },
          totalSizeByTypeJS: {
            value: 80,
          },
          totalSizeByTypeCSS: {
            value: 10,
          },
          totalSizeByTypeFONT: {
            value: 0,
          },
          totalSizeByTypeHTML: {
            value: 5,
          },
          totalSizeByTypeIMG: {
            value: 5,
          },
          totalSizeByTypeMEDIA: {
            value: 0,
          },
          totalSizeByTypeOTHER: {
            value: 0,
          },
          totalInitialSizeJS: {
            value: 80,
          },
          totalInitialSizeCSS: {
            value: 10,
          },
        },
        cacheInvalidation: {
          value: 45.45,
        },
        moduleCount: {
          value: 3,
        },
        chunkCount: {
          value: 0,
        },
        assetCount: {
          value: 5,
        },
        packageCount: {
          value: 1,
        },
      },
    });
  });
});
