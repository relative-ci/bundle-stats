import webpackStatsCurrentExtracted from '../../../__fixtures__/webpack-stats-1.extracted';
import webpackStatsBaselineExtracted from '../../../__fixtures__/webpack-stats-2.extracted';
import { createJob } from '../create';

describe('Create job', () => {
  test('no baseline', () => {
    const actual = createJob({
      webpack: {
        stats: webpackStatsCurrentExtracted,
      },
    });

    const expected = {
      summary: {
        'webpack.assets.totalSizeByTypeALL': {
          baseline: 0,
          current: 63000,
        },
        'webpack.assets.totalInitialSizeJS': {
          baseline: 0,
          current: 50000,
        },
        'webpack.assets.totalInitialSizeCSS': {
          baseline: 0,
          current: 10000,
        },
        'webpack.cacheInvalidation': {
          baseline: 0,
          current: 0,
        },
        'webpack.modulesCount': {
          baseline: 0,
          current: 2,
        },
        'webpack.chunksCount': {
          baseline: 0,
          current: 0,
        },
        'webpack.assetsCount': {
          baseline: 0,
          current: 4,
        },
      },
      stats: {
        webpack: {
          assets: {
            totalSizeByTypeALL: {
              value: 63000,
            },
            totalSizeByTypeCSS: {
              value: 10000,
            },
            totalSizeByTypeJS: {
              value: 50000,
            },
            totalSizeByTypeIMG: {
              value: 1000,
            },
            totalSizeByTypeMEDIA: {
              value: 0,
            },
            totalSizeByTypeFONT: {
              value: 0,
            },
            totalSizeByTypeHTML: {
              value: 2000,
            },
            totalSizeByTypeOTHER: {
              value: 0,
            },
            totalInitialSizeCSS: {
              value: 10000,
            },
            totalInitialSizeJS: {
              value: 50000,
            },
          },
          cacheInvalidation: {
            value: 0,
          },
          modulesCount: {
            value: 2,
          },
          chunksCount: {
            value: 0,
          },
          assetsCount: {
            value: 4,
          },
          packageCount: {
            value: 0,
          },
        },
      },
      rawData: {
        webpack: {
          stats: webpackStatsCurrentExtracted,
        },
      },
    };

    expect(expected).toEqual(actual);
  });

  test('with baseline', () => {
    const baselineJob = createJob({ webpack: { stats: webpackStatsBaselineExtracted } });
    const actual = createJob({ webpack: { stats: webpackStatsCurrentExtracted } }, baselineJob);

    const expected = {
      summary: {
        'webpack.assets.totalSizeByTypeALL': {
          baseline: 63000,
          current: 63000,
        },
        'webpack.assets.totalInitialSizeJS': {
          baseline: 49000,
          current: 50000,
        },
        'webpack.assets.totalInitialSizeCSS': {
          baseline: 11000,
          current: 10000,
        },
        'webpack.cacheInvalidation': {
          baseline: 0,
          current: 95.24,
        },
        'webpack.modulesCount': {
          baseline: 2,
          current: 2,
        },
        'webpack.chunksCount': {
          baseline: 0,
          current: 0,
        },
        'webpack.assetsCount': {
          baseline: 4,
          current: 4,
        },
      },
      stats: {
        webpack: {
          assets: {
            totalSizeByTypeALL: {
              value: 63000,
            },
            totalSizeByTypeCSS: {
              value: 10000,
            },
            totalSizeByTypeJS: {
              value: 50000,
            },
            totalSizeByTypeIMG: {
              value: 1000,
            },
            totalSizeByTypeMEDIA: {
              value: 0,
            },
            totalSizeByTypeFONT: {
              value: 0,
            },
            totalSizeByTypeHTML: {
              value: 2000,
            },
            totalSizeByTypeOTHER: {
              value: 0,
            },
            totalInitialSizeCSS: {
              value: 10000,
            },
            totalInitialSizeJS: {
              value: 50000,
            },
          },
          cacheInvalidation: {
            value: 95.24,
          },
          modulesCount: {
            value: 2,
          },
          chunksCount: {
            value: 0,
          },
          assetsCount: {
            value: 4,
          },
          packageCount: {
            value: 0,
          },
        },
      },
      rawData: {
        webpack: {
          stats: webpackStatsCurrentExtracted,
        },
      },
    };

    expect(expected).toEqual(actual);
  });
});
