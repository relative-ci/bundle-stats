import webpackStatsCurrentExtracted from '../../../__fixtures__/webpack-stats-1.extracted';
import webpackStatsBaselineExtracted from '../../../__fixtures__/webpack-stats-2.extracted';
import { createJobs } from '../../jobs';
import { createReport } from '../create-report';

describe('createReport', () => {
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
