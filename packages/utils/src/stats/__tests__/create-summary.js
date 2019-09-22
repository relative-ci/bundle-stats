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
        moduleCount: {
          value: 0,
        },
        chunkCount: {
          value: 2,
        },
        assetCount: {
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
      'webpack.moduleCount': {
        baseline: 0,
        current: 0,
      },
      'webpack.chunkCount': {
        baseline: 0,
        current: 2,
      },
      'webpack.assetCount': {
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
          moduleCount: {
            value: 2,
          },
          chunkCount: {
            value: 2,
          },
          assetCount: {
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
          moduleCount: {
            value: 3,
          },
          chunkCount: {
            value: 3,
          },
          assetCount: {
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
      'webpack.moduleCount': {
        baseline: 2,
        current: 3,
      },
      'webpack.chunkCount': {
        baseline: 2,
        current: 3,
      },
      'webpack.assetCount': {
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
