import webpackStatsCurrentExtracted from '../../../__fixtures__/webpack-stats-1.extracted';
import webpackStatsBaselineExtracted from '../../../__fixtures__/webpack-stats-2.extracted';

import { createJob } from '../create-job';

describe('createJob', () => {
  test('no baseline', () => {
    const actual = createJob({ webpack: webpackStatsCurrentExtracted });
    expect(actual).toMatchSnapshot();
  });

  test('with baseline', () => {
    const baselineJob = createJob({ webpack: webpackStatsBaselineExtracted });
    const actual = createJob({ webpack: webpackStatsCurrentExtracted }, baselineJob);
    expect(actual).toMatchSnapshot();
  });
});
