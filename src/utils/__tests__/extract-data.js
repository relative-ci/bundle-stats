import { extractDataFromWebpackStats } from '../extract-data';

import webpackStats from '../../../__fixtures__/webpack-stats-1';
import webpackStatsExtracted from '../../../__fixtures__/webpack-stats-1.extracted';

test('Extract data from webpack stats', () => {
  const actual = extractDataFromWebpackStats(webpackStats);
  expect(webpackStatsExtracted).toEqual(actual);
});
