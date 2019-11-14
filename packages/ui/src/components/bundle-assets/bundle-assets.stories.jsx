import React from 'react';
import { storiesOf } from '@storybook/react';
import { createJobs } from '@bundle-stats/utils';

import baselineStats from '../../../__mocks__/webpack-stats.baseline.json';
import currentStats from '../../../__mocks__/webpack-stats.current.json';
import { getWrapperDecorator } from '../../stories';
import { BundleAssets } from '.';

const [currentJob, baselineJob] = createJobs([
  { webpack: { stats: currentStats } },
  { webpack: { stats: baselineStats } },
]);

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

stories.add('no assets', () => (
  <BundleAssets
    jobs={[
      {
        ...currentJob,
        rawData: {
          webpack: {
            stats: {
              assets: [],
            },
          },
        },
      },
      {
        ...baselineJob,
        rawData: {
          webpack: {
            stats: {
              assets: [],
            },
          },
        },
      },
    ]}
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
