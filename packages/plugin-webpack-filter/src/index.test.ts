import filter from './index';

/* eslint-disable import/no-relative-packages */
// @ts-ignore
import webpackStats from '../../utils/__fixtures__/webpack-stats-1';
// @ts-ignore
import webpackStatsExtracted from '../../utils/__fixtures__/webpack-stats-1.extracted';
// @ts-ignore
import webpackStatsConcatenatedModules from '../../utils/__fixtures__/webpack-stats-3';
// @ts-ignore
import webpackStatsConcatenatedModulesExtracted from '../../utils/__fixtures__/webpack-stats-3.extracted';
/* eslint-enable import/no-relative-packages */

describe('Webpack filter', () => {
  test('should return empty meta', () => {
    const actual = filter({
      ...webpackStats,
      builtAt: undefined,
      hash: undefined,
    } as any);
    expect({
      ...webpackStatsExtracted,
      builtAt: undefined,
      hash: undefined,
    }).toEqual(actual);
  });

  test('should return meta', () => {
    const actual = filter(webpackStats as any);
    expect(actual).toEqual(webpackStatsExtracted);
  });

  test('should filter concatenated modules', () => {
    const actual = filter(webpackStatsConcatenatedModules as any);
    expect(actual).toEqual(webpackStatsConcatenatedModulesExtracted);
  });
});
