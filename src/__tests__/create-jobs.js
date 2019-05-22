import currentJobFixtures from '../../__fixtures__/webpack-stats-current.json';
import baselineJobFixtures from '../../__fixtures__/webpack-stats-baseline.json';

import { createJobs } from '../create-jobs';

describe('createJobs', () => {
  test('single job', () => {
    const actual = createJobs([currentJobFixtures]);
    expect(actual[0].internalBuildNumber).toBe(1);
  });
  test('multiple jobs', () => {
    const actual = createJobs([currentJobFixtures, baselineJobFixtures]);
    expect(actual[1].internalBuildNumber).toBe(2);
  });
});
