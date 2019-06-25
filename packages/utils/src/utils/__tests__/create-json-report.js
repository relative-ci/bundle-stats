import webpackStatsCurrentExtracted from '../../../__fixtures__/webpack-stats-1.extracted';
import webpackStatsBaselineExtracted from '../../../__fixtures__/webpack-stats-2.extracted';
import { createJSONReport } from '../create-json-report';
import expectedSingle from '../../../__fixtures__/create-json-report.single';
import expectedMultiple from '../../../__fixtures__/create-json-report.multiple';

describe('createJSONReport', () => {
  test('one source', () => {
    const actual = createJSONReport([{ webpack: { stats: webpackStatsCurrentExtracted } }]);

    expect(JSON.parse(actual)).toEqual(expectedSingle);
  });

  test('multiple sources', () => {
    const actual = createJSONReport([
      { webpack: { stats: webpackStatsCurrentExtracted } },
      { webpack: { stats: webpackStatsBaselineExtracted } },
    ]);

    expect(JSON.parse(actual)).toEqual(expectedMultiple);
  });
});
