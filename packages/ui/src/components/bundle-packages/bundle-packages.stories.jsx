import React from 'react';
import merge from 'lodash/merge';
import set from 'lodash/set';
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

export default {
  title: 'Components/BundlePackages',
  component: BundlePackages,
  decorators: [getWrapperDecorator()],
};

export const Default = () => <BundlePackages jobs={[baselineJob]} />;

export const MultipleJobs = () => <BundlePackages jobs={JOBS} />;

export const CustomFilters = () => (
  <BundlePackages
    jobs={JOBS}
    filters={{
      [PACKAGE_FILTERS.CHANGED]: false,
      [PACKAGE_FILTERS.DUPLICATE]: true,
    }}
  />
);

export const EmptyPackages = () => (
  <BundlePackages
    jobs={[
      set(merge({}, currentJob), 'metrics.webpack.packages', {}),
      set(merge({}, baselineJob), 'metrics.webpack.packages', {}),
    ]}
  />
);

export const EmptyFilteredPackages = () => (
  <BundlePackages
    jobs={[
      set(merge({}, currentJob), 'metrics.webpack.packages', { 'package-a': { value: 100 } }),
      set(merge({}, baselineJob), 'metrics.webpack.packages', { 'package-a': { value: 100 } }),
    ]}
  />
);

const JOBS_EMPTY_BASELINE = createJobs([
  { webpack: currentStats },
  { webpack: null },
]);

export const EmptyBaseline = () => <BundlePackages jobs={JOBS_EMPTY_BASELINE} />;
