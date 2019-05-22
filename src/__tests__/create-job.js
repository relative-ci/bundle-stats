/* global xtest */
import fixturesA from '../../__fixtures__/webpack-stats-0.json';
import fixturesB from '../../__fixtures__/webpack-stats-1.json';
import { createJobs } from '../create-jobs';

test('Create jobs from 1 artifact', () => {
  const result = createJobs([fixturesA]);
  const expected = [
    {
      internalBuildNumber: 1,
      stats: {
        webpack: {
          assets: {
            totalInitialSizeCSS: { value: 0 },
            totalInitialSizeJS: { value: 0 },
            totalSizeByTypeALL: { value: 509337 },
            totalSizeByTypeCSS: { value: 7192 },
            totalSizeByTypeFONT: { value: 0 },
            totalSizeByTypeHTML: { value: 3686 },
            totalSizeByTypeIMG: { value: 75547 },
            totalSizeByTypeJS: { value: 419034 },
            totalSizeByTypeMEDIA: { value: 0 },
            totalSizeByTypeOTHER: { value: 3878 },
          },
          assetsCount: { value: 48 },
          cacheInvalidation: { value: 0 },
          chunksCount: { value: 0 },
          modulesCount: { value: 0 },
        },
      },
      summary: {
        'webpack.assets.totalInitialSizeCSS': {
          baseline: 0,
          current: 0,
        },
        'webpack.assets.totalInitialSizeJS': {
          baseline: 0,
          current: 0,
        },
        'webpack.assets.totalSizeByTypeALL': {
          baseline: 0,
          current: 509337,
        },
        'webpack.assetsCount': {
          baseline: 0,
          current: 48,
        },
        'webpack.cacheInvalidation': {
          baseline: 0,
          current: 0,
        },
        'webpack.chunksCount': {
          baseline: 0,
          current: 0,
        },
        'webpack.modulesCount': {
          baseline: 0,
          current: 0,
        },
      },
    },
  ];

  expect(result).toEqual(expected);
});

xtest('Create jobs from multiple artifacts', () => {
  const actual = createJobs([fixturesA, fixturesB]);
  const expected = [
    {
      internalBuildNumber: 1,
      rawData: {},
      stats: {
        webpack: {
          assets: {},
        },
      },
    },
    {
      internalBuildNumber: 1,
      rawData: {},
      stats: {
        webpack: {
          assets: {},
        },
      },
      summary: {},
    },
  ];

  expect(expected).toEqual(actual);
});
