import { SUMMARY_METRIC_PATHS } from '../../webpack';
import { createSummary } from '../create-summary';

describe('createSummary', () => {
  test('should create stats summary when baseline is null', () => {
    const actual = createSummary(SUMMARY_METRIC_PATHS, null, {
      totalSizeByTypeALL: {
        value: 100,
      },
      totalInitialSizeJS: {
        value: 80,
      },
      totalInitialSizeCSS: {
        value: 10,
      },
      cacheInvalidation: {
        value: 0,
      },
      moduleCount: {
        value: 0,
      },
      duplicateModulesCount: {
        value: 0,
      },
      duplicateCode: {
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
      duplicatePackagesCount: {
        value: 2,
      },
    });

    expect(actual).toEqual({
      totalSizeByTypeALL: {
        baseline: 0,
        current: 100,
      },
      totalInitialSizeJS: {
        baseline: 0,
        current: 80,
      },
      totalInitialSizeCSS: {
        baseline: 0,
        current: 10,
      },
      cacheInvalidation: {
        baseline: 0,
        current: 0,
      },
      moduleCount: {
        baseline: 0,
        current: 0,
      },
      duplicateModulesCount: {
        baseline: 0,
        current: 0,
      },
      duplicateCode: {
        baseline: 0,
        current: 0,
      },
      chunkCount: {
        baseline: 0,
        current: 2,
      },
      assetCount: {
        baseline: 0,
        current: 5,
      },
      packageCount: {
        baseline: 0,
        current: 2,
      },
      duplicatePackagesCount: {
        baseline: 0,
        current: 2,
      },
    });
  });

  test('should create stats summary with baseline', () => {
    const actual = createSummary(
      SUMMARY_METRIC_PATHS,
      {
        totalSizeByTypeALL: {
          value: 100,
        },
        totalInitialSizeJS: {
          value: 80,
        },
        totalInitialSizeCSS: {
          value: 10,
        },
        cacheInvalidation: {
          value: 45.45,
        },
        moduleCount: {
          value: 2,
        },
        duplicateModulesCount: {
          value: 0,
        },
        duplicateCode: {
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
        duplicatePackagesCount: {
          value: 2,
        },
      },
      {
        totalSizeByTypeALL: {
          value: 120,
        },
        totalInitialSizeJS: {
          value: 90,
        },
        totalInitialSizeCSS: {
          value: 20,
        },
        cacheInvalidation: {
          value: 20,
        },
        moduleCount: {
          value: 3,
        },
        duplicateModulesCount: {
          value: 0,
        },
        duplicateCode: {
          value: 0,
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
        duplicatePackagesCount: {
          value: 2,
        },
      },
    );

    expect(actual).toEqual({
      totalSizeByTypeALL: {
        baseline: 100,
        current: 120,
      },
      totalInitialSizeJS: {
        baseline: 80,
        current: 90,
      },
      totalInitialSizeCSS: {
        baseline: 10,
        current: 20,
      },
      cacheInvalidation: {
        baseline: 45.45,
        current: 20,
      },
      moduleCount: {
        baseline: 2,
        current: 3,
      },
      duplicateModulesCount: {
        baseline: 0,
        current: 0,
      },
      duplicateCode: {
        baseline: 0,
        current: 0,
      },
      chunkCount: {
        baseline: 2,
        current: 3,
      },
      assetCount: {
        baseline: 5,
        current: 6,
      },
      packageCount: {
        baseline: 2,
        current: 2,
      },
      duplicatePackagesCount: {
        baseline: 2,
        current: 2,
      },
    });
  });
});
