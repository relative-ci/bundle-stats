import webpackStatsCurrentExtracted from '../../../__fixtures__/webpack-stats-1.extracted';
import webpackStatsBaselineExtracted from '../../../__fixtures__/webpack-stats-2.extracted';
import { createJobs } from '../create';

describe('Create jobs', () => {
  test('single job', () => {
    const actual = createJobs([{ webpack: { stats: webpackStatsCurrentExtracted } }]);
    expect(actual[0].internalBuildNumber).toBe(1);
  });
  test('multiple jobs', () => {
    const actual = createJobs([
      { webpack: { stats: webpackStatsCurrentExtracted } },
      { webpack: { stats: webpackStatsBaselineExtracted } },
    ]);
    expect(actual[0].internalBuildNumber).toBe(2);
  });
});
