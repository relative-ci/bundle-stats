/* global module */
import { storiesOf } from '@storybook/react';
import { createJob } from '@relative-ci/utils';

import currentFixtures from '../../../fixtures/webpack-stats-1.extracted';
import baselineFixtures from '../../../fixtures/webpack-stats-2.extracted';
import StandaloneApp from '.';

const BASELINE_JOB = {
  ...createJob({ webpack: { stats: baselineFixtures } }),
  internalBuildNumber: 2,
};
const CURRENT_JOB = {
  ...createJob({ webpack: { stats: currentFixtures } }, BASELINE_JOB),
  internalBuildNumber: 1,
};

const stories = storiesOf('StandaloneApp', module);

stories.add('default', () => (
  <StandaloneApp jobs={[CURRENT_JOB, BASELINE_JOB]} />
));
