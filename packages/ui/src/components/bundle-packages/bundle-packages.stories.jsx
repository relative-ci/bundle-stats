import React from 'react';
import { storiesOf } from '@storybook/react';
import { createStats, createStatsSummary } from '@bundle-stats/utils';

import currentData from '../../../__mocks__/job.current.json';
import baselineData from '../../../__mocks__/job.baseline.json';
import { getWrapperDecorator } from '../../stories';
import { BundlePackages } from '.';

const currentStats = createStats(baselineData.rawData, currentData.rawData);
const baselineStats = createStats(null, baselineData.rawData);

const currentJob = {
  ...currentData,
  stats: currentStats,
  summary: createStatsSummary(baselineStats, currentStats),
};

const baselineJob = {
  ...baselineData,
  stats: baselineStats,
  summary: createStatsSummary(null, baselineStats),
};

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
