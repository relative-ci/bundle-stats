import React from 'react';
import { storiesOf } from '@storybook/react';
import { createJobs } from '@bundle-stats/utils';

import baselineStats from '../../../__mocks__/webpack-stats.baseline.json';
import currentStats from '../../../__mocks__/webpack-stats.current.json';
import { getWrapperDecorator } from '../../stories';
import { BundleModules } from '.';

const JOBS = createJobs([
  { webpack: currentStats },
  { webpack: baselineStats },
]);

const stories = storiesOf('Components/BundleModules', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <BundleModules jobs={JOBS[1]} />
));

stories.add('multiple jobs', () => (
  <BundleModules jobs={JOBS} />
));

const JOBS_EMPTY_BASELINE = createJobs([{ webpack: currentStats }, null]);

stories.add('empty baseline', () => (
  <BundleModules jobs={JOBS_EMPTY_BASELINE} />
));
