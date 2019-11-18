import { filter } from '../filter';

import webpackStats from '../../../__fixtures__/webpack-stats-1';
import webpackStatsExtracted from '../../../__fixtures__/webpack-stats-1.extracted';

describe('Webpack/filter', () => {
  test('should return empty meta', () => {
    const actual = filter({
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
    const actual = filter(webpackStats);
    expect(webpackStatsExtracted).toEqual(actual);
  });
});
