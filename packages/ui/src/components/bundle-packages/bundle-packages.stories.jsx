import React from 'react';
import { merge, set } from 'lodash';
import { storiesOf } from '@storybook/react';
import { createJobs } from '@bundle-stats/utils';

import baselineStats from '../../../__mocks__/webpack-stats.baseline.json';
import currentStats from '../../../__mocks__/webpack-stats.current.json';
import { getWrapperDecorator } from '../../stories';
import { BundlePackages } from '.';

const [currentJob, baselineJob] = createJobs([
  { webpack: currentStats },
  { webpack: baselineStats },
]);

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

stories.add('empty packages', () => (
  <BundlePackages
    jobs={[
      set(merge({}, currentJob), 'rawData.webpack.modules', []),
      set(merge({}, baselineJob), 'rawData.webpack.modules', []),
    ]}
  />
));

stories.add('empty filtered packages', () => (
  <BundlePackages
    jobs={[
      set(merge({}, currentJob), 'rawData.webpack.modules', [
        {
          name: './node_modules/package-a/dist.js',
          size: 100,
          chunks: [1],
        },
      ]),
      set(merge({}, baselineJob), 'rawData.webpack.modules', [
        {
          name: './node_modules/package-a/dist.js',
          size: 100,
          chunks: [1],
        },
      ]),
    ]}
  />
));

stories.add('empty baseline', () => (
  <BundlePackages
    jobs={[currentJob, undefined]}
  />
));
