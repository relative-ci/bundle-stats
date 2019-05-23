import React from 'react';
import { storiesOf } from '@storybook/react';
import { createStats, createStatsSummary } from '@bundle-stats/utils';

import currentData from '../../../__mocks__/job.current.json';
import baselineData from '../../../__mocks__/job.baseline.json';
import { getWrapperDecorator } from '../../stories';
import { BundleModules } from './bundle-modules';

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

const stories = storiesOf('Components/BundleModules', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <BundleModules jobs={[currentJob]} />
));

stories.add('multiple runs', () => (
  <BundleModules jobs={[currentJob, baselineJob]} />
));

stories.add('empty baseline', () => (
  <BundleModules jobs={[currentJob, null]} />
));

stories.add('no modules', () => (
  <BundleModules
    jobs={[
      {
        ...currentJob,
        rawData: {
          webpack: {
            stats: {
              ...currentJob.rawData.webpack.stats,
              modules: undefined,
            },
          },
        },
      },
      {
        ...baselineJob,
        rawData: {
          webpack: {
            stats: {
              ...baselineJob.rawData.webpack.stats,
              modules: undefined,
            },
          },
        },
      },
    ]}
  />
));

stories.add('no chunks', () => (
  <BundleModules
    jobs={[
      {
        ...currentJob,
        rawData: {
          webpack: {
            stats: {
              ...currentJob.rawData.webpack.stats,
              chunks: undefined,
            },
          },
        },
      },
      {
        ...baselineJob,
        rawData: {
          webpack: {
            stats: {
              ...baselineJob.rawData.webpack.stats,
              chunks: undefined,
            },
          },
        },
      },
    ]}
  />
));
