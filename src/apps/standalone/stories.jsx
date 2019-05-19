/* global module */
import { storiesOf } from '@storybook/react';
import { createJob } from '@relative-ci/utils';

import currentData from '../../../fixtures/job.current.json';
import baselineData from '../../../fixtures/job.baseline.json';
import StandaloneApp from '.';

const BASELINE_JOB = {
  ...baselineData,
  ...createJob(baselineData.rawData),
};

const CURRENT_JOB = {
  ...currentData,
  ...createJob(currentData.rawData, BASELINE_JOB),
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
