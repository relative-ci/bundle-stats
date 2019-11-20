import React from 'react';
import { storiesOf } from '@storybook/react';
import { createJobs } from '@bundle-stats/utils';

import baselineStats from '../../../__mocks__/webpack-stats.baseline.json';
import currentStats from '../../../__mocks__/webpack-stats.current.json';
import { getWrapperDecorator } from '../../stories';
import { BundleAssets } from '.';

const [currentJob, baselineJob] = createJobs([
  { webpack: currentStats },
  { webpack: baselineStats },
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
            assets: [],
          },
        },
      },
      {
        ...baselineJob,
        rawData: {
          webpack: {
            assets: [],
          },
        },
      },
    ]}
  />
));

stories.add('empty filtered data', () => (
  <BundleAssets
    jobs={[
      {
        ...currentJob,
        rawData: {
          webpack: {
            assets: [{
              name: 'main.js',
              size: 100,
            }],
          },
        },
      },
      {
        ...baselineJob,
        rawData: {
          webpack: {
            assets: [{
              name: 'main.js',
              size: 100,
            }],
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
            assets: [
              {
                name: 'static/js/not-predictive.93191.js',
                size: 2989,
              },
            ],
          },
        },
      },
      {
        ...baselineJob,
        rawData: {
          webpack: {
            assets: [
              {
                name: 'static/js/not-predictive.93191.js',
                size: 2988,
              },
            ],
          },
        },
      },
    ]}
  />
));
