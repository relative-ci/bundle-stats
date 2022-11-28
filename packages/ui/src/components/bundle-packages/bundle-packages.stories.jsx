import React from 'react';
import merge from 'lodash/merge';
import set from 'lodash/set';
import { storiesOf } from '@storybook/react';
import { PACKAGE_FILTERS, createJobs } from '@bundle-stats/utils';

import baselineStats from '../../../__mocks__/webpack-stats.baseline.json';
import currentStats from '../../../__mocks__/webpack-stats.current.json';
import { getWrapperDecorator } from '../../stories';
import { BundlePackages } from '.';

const JOBS = createJobs([
  { webpack: currentStats },
  { webpack: baselineStats },
]);
const [currentJob, baselineJob] = JOBS;

const stories = storiesOf('Components/BundlePackages', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => <BundlePackages jobs={[baselineJob]} />);

stories.add('multiple jobs', () => <BundlePackages jobs={JOBS} />);

stories.add('custom filters', () => (
  <BundlePackages
    jobs={JOBS}
    filters={{
      [PACKAGE_FILTERS.CHANGED]: false,
      [PACKAGE_FILTERS.DUPLICATE]: true,
    }}
  />
));

stories.add('empty packages', () => (
  <BundlePackages
    jobs={[
      set(merge({}, currentJob), 'metrics.webpack.packages', {}),
      set(merge({}, baselineJob), 'metrics.webpack.packages', {}),
    ]}
  />
));

stories.add('empty filtered packages', () => (
  <BundlePackages
    jobs={[
      set(merge({}, currentJob), 'metrics.webpack.packages', { 'package-a': { value: 100 } }),
      set(merge({}, baselineJob), 'metrics.webpack.packages', { 'package-a': { value: 100 } }),
    ]}
  />
));

const JOBS_EMPTY_BASELINE = createJobs([
  { webpack: currentStats },
  { webpack: null },
]);

stories.add('empty baseline', () => <BundlePackages jobs={JOBS_EMPTY_BASELINE} />);
