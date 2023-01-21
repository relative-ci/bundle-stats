import webpackStatsCurrentExtracted from '../../../__fixtures__/webpack-stats-1.extracted';
import webpackStatsBaselineExtracted from '../../../__fixtures__/webpack-stats-2.extracted';

import { BudgetStatus } from '../../constants';
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

  test('should evaluate budgets', () => {
    const baselineJob = createJob({ webpack: webpackStatsBaselineExtracted });
    const actual = createJob({ webpack: webpackStatsCurrentExtracted }, baselineJob, [
      {
        condition: {
          fact: 'webpack.totalSizeByTypeALL.value',
          operator: 'greaterThan',
          value: 50000,
        },
        status: BudgetStatus.FAILURE,
      },
    ]);
    expect(actual).toMatchSnapshot();
  });
});
