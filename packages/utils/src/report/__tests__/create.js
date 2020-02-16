import { advanceTo } from 'jest-date-mock';

import webpackStatsCurrentExtracted from '../../../__fixtures__/webpack-stats-1.extracted';
import webpackStatsBaselineExtracted from '../../../__fixtures__/webpack-stats-2.extracted';
import { createJobs } from '../../jobs';
import { createReport } from '../create';

advanceTo(new Date(2019, 0, 10));

describe('report / createReport', () => {
  test('single source', () => {
    const actual = createReport(createJobs([
      { webpack: webpackStatsCurrentExtracted },
    ]));

    expect(actual).toMatchSnapshot();
  });

  test('multiple sources', () => {
    const actual = createReport(createJobs([
      { webpack: webpackStatsCurrentExtracted },
      { webpack: webpackStatsBaselineExtracted },
    ]));

    expect(actual).toMatchSnapshot();
  });
});
