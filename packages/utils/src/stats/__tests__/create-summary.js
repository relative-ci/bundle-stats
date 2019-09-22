import { createStatsSummary } from '../create-summary';

describe('createStatsSummary', () => {
  test('should create stats summary when baseline is null', () => {
    const actual = createStatsSummary(null, {
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
        modulesCount: {
          value: 0,
        },
        chunksCount: {
          value: 2,
        },
        assetsCount: {
          value: 5,
        },
        packageCount: {
          value: 2,
        },
      },
    });

    expect(actual).toEqual({
      'webpack.assets.totalSizeByTypeALL': {
        baseline: 0,
        current: 100,
      },
      'webpack.assets.totalInitialSizeJS': {
        baseline: 0,
        current: 80,
      },
      'webpack.assets.totalInitialSizeCSS': {
        baseline: 0,
        current: 10,
      },
      'webpack.cacheInvalidation': {
        baseline: 0,
        current: 0,
      },
      'webpack.modulesCount': {
        baseline: 0,
        current: 0,
      },
      'webpack.chunksCount': {
        baseline: 0,
        current: 2,
      },
      'webpack.assetsCount': {
        baseline: 0,
        current: 5,
      },
      'webpack.packageCount': {
        baseline: 0,
        current: 2,
      },
    });
  });

  test('should create stats summary with baseline', () => {
    const actual = createStatsSummary(
      {
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
          modulesCount: {
            value: 2,
          },
          chunksCount: {
            value: 2,
          },
          assetsCount: {
            value: 5,
          },
          packageCount: {
            value: 2,
          },
        },
      },
      {
        webpack: {
          assets: {
            totalSizeByTypeALL: {
              value: 120,
            },
            totalSizeByTypeJS: {
              value: 90,
            },
            totalSizeByTypeCSS: {
              value: 20,
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
              value: 90,
            },
            totalInitialSizeCSS: {
              value: 20,
            },
          },
          cacheInvalidation: {
            value: 20,
          },
          modulesCount: {
            value: 3,
          },
          chunksCount: {
            value: 3,
          },
          assetsCount: {
            value: 6,
          },
          packageCount: {
            value: 2,
          },
        },
      },
    );

    expect(actual).toEqual({
      'webpack.assets.totalSizeByTypeALL': {
        baseline: 100,
        current: 120,
      },
      'webpack.assets.totalInitialSizeJS': {
        baseline: 80,
        current: 90,
      },
      'webpack.assets.totalInitialSizeCSS': {
        baseline: 10,
        current: 20,
      },
      'webpack.cacheInvalidation': {
        baseline: 45.45,
        current: 20,
      },
      'webpack.modulesCount': {
        baseline: 2,
        current: 3,
      },
      'webpack.chunksCount': {
        baseline: 2,
        current: 3,
      },
      'webpack.assetsCount': {
        baseline: 5,
        current: 6,
      },
      'webpack.packageCount': {
        baseline: 2,
        current: 2,
      },
    });
  });
});
