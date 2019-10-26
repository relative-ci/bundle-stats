import React from 'react';
import { storiesOf } from '@storybook/react';
import { createJob } from '@bundle-stats/utils';

import currentData from '../../../__mocks__/job.current.json';
import baselineData from '../../../__mocks__/job.baseline.json';
import { getWrapperDecorator } from '../../stories';
import { BundlePackages } from '.';

const baselineJob = createJob(baselineData.rawData);
const currentJob = createJob(currentData.rawData, baselineJob);

const stories = storiesOf('Components/BundlePackages', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <BundlePackages jobs={[currentJob]} />
));

stories.add('multiple jobs', () => (
  <BundlePackages
    jobs={[currentJob, baselineJob]}
  />
));

stories.add('empty baseline', () => (
  <BundlePackages
    jobs={[currentJob, undefined]}
  />
));
