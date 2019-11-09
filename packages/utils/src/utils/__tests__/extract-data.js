import { extractDataFromWebpackStats } from '../extract-data';

import webpackStats from '../../../__fixtures__/webpack-stats-1';
import webpackStatsExtracted from '../../../__fixtures__/webpack-stats-1.extracted';

describe('extractDataFromWebpackStats', () => {
  test('should return empty meta', () => {
    const actual = extractDataFromWebpackStats({
      ...webpackStats,
      builtAt: undefined,
      hash: undefined,
    });
    expect({
      ...webpackStatsExtracted,
      builtAt: undefined,
      hash: undefined,
    }).toEqual(actual);
  });

  test('should return meta', () => {
    const actual = extractDataFromWebpackStats(webpackStats);
    expect(webpackStatsExtracted).toEqual(actual);
  });
});
