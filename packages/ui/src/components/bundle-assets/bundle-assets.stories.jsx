import React from 'react';
import { storiesOf } from '@storybook/react';
import { createStats, createStatsSummary } from '@bundle-stats/utils';

import currentData from '../../../__mocks__/job.current.json';
import baselineData from '../../../__mocks__/job.baseline.json';
import { getWrapperDecorator } from '../../stories';
import { BundleAssets } from '.';

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

const stories = storiesOf('Components/BundleAssets', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <BundleAssets jobs={[currentJob]} />
));

stories.add('multiple jobs', () => (
  <BundleAssets
    jobs={[currentJob, baselineJob]}
  />
));

stories.add('empty baseline', () => (
  <BundleAssets
    jobs={[currentJob, undefined]}
  />
));

stories.add('not predictive', () => (
  <BundleAssets
    jobs={[
      {
        ...currentJob,
        rawData: {
          webpack: {
            stats: {
              assets: [
                {
                  name: 'static/js/not-predictive.93191.js',
                  size: 2989,
                },
              ],
            },
          },
        },
      },
      {
        ...baselineJob,
        rawData: {
          webpack: {
            stats: {
              assets: [
                {
                  name: 'static/js/not-predictive.93191.js',
                  size: 2988,
                },
              ],
            },
          },
        },
      },
    ]}
  />
));
