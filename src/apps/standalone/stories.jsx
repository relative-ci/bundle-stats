/* global module */
import { storiesOf } from '@storybook/react';
import { createJob } from '@relative-ci/utils';

import currentFixtures from '../../../fixtures/webpack-stats-1.extracted';
import baselineFixtures from '../../../fixtures/webpack-stats-2.extracted';
import StandaloneApp from '.';

const BASELINE_JOB = {
  ...createJob({ webpack: { stats: baselineFixtures } }),
  internalBuildNumber: 1,
};
const CURRENT_JOB = {
  ...createJob({ webpack: { stats: currentFixtures } }, BASELINE_JOB),
  internalBuildNumber: 2,
};

const stories = storiesOf('StandaloneApp', module);

stories.addDecorator(storyFn => (
  <div style={{ margin: '-1rem' }}>
    {storyFn()}
  </div>
));

stories.add('default', () => (
  <StandaloneApp jobs={[CURRENT_JOB, BASELINE_JOB]} />
));

stories.add('no baseline', () => (
  <StandaloneApp jobs={[CURRENT_JOB]} />
));

stories.add('empty', () => (
  <StandaloneApp />
));
