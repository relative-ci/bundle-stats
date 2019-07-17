import webpackStatsCurrentExtracted from '../../../__fixtures__/webpack-stats-1.extracted';
import webpackStatsBaselineExtracted from '../../../__fixtures__/webpack-stats-2.extracted';
import expectedSingle from '../../../__fixtures__/create-json-report.single';
import expectedMultiple from '../../../__fixtures__/create-json-report.multiple';
import { createJobs } from '../../jobs';
import { createReport } from '../create-report';

describe('createReport', () => {
  test('one source', () => {
    const actual = createReport(createJobs([
      { webpack: { stats: webpackStatsCurrentExtracted } },
    ]));

    expect(actual).toEqual(expectedSingle);
  });

  test('multiple sources', () => {
    const actual = createReport(createJobs([
      { webpack: { stats: webpackStatsCurrentExtracted } },
      { webpack: { stats: webpackStatsBaselineExtracted } },
    ]));

    expect(actual).toEqual(expectedMultiple);
  });
});
