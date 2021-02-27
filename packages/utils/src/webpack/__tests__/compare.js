import webpackStatsCurrentExtracted from '../../../__fixtures__/webpack-stats-1.extracted';
import webpackStatsBaselineExtracted from '../../../__fixtures__/webpack-stats-2.extracted';

import { createJobs } from '../../jobs';
import { SECTION_WEBPACK_ALL_MODULES } from '../constants';
import { compareBySection } from '../compare';

const JOBS = createJobs([
  { webpack: webpackStatsCurrentExtracted },
  { webpack: webpackStatsBaselineExtracted },
]);

describe('Webpack/compare', () => {
  test('should compare all modules', () => {
    const result = compareBySection[SECTION_WEBPACK_ALL_MODULES](JOBS);
    expect(result).toMatchSnapshot();
  })
});
