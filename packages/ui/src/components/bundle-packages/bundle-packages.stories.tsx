import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import merge from 'lodash/merge';
import set from 'lodash/set';
import { PACKAGE_FILTERS, createJobs, Job } from '@bundle-stats/utils';

/* eslint-disable import/no-relative-packages */
import baselineStats from '../../../../../fixtures/webpack-stats.baseline.json';
import currentStats from '../../../../../fixtures/webpack-stats.current.json';
/* eslint-enable import/no-relative-packages */
import { getWrapperDecorator } from '../../stories';
import { BundlePackages } from '.';

const JOBS = createJobs([{ webpack: currentStats }, { webpack: baselineStats }]);
const [currentJob, baselineJob] = JOBS;

// BundlePackages is a plain .jsx component with no inline destructuring
// defaults, so TS can't infer its optional props on its own.
const TypedBundlePackages = BundlePackages as unknown as React.ComponentType<{
  jobs: Array<Job>;
  filters?: Record<string, boolean>;
  search?: string;
  sortBy?: string;
  direction?: string;
  setState: (params: any) => void;
}>;

const meta = {
  title: 'Components/BundlePackages',
  component: TypedBundlePackages,
  decorators: [getWrapperDecorator()],
  args: {
    setState: () => {},
  },
} satisfies Meta<typeof TypedBundlePackages>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    jobs: [baselineJob],
  },
};

export const MultipleJobs: Story = {
  args: {
    jobs: JOBS,
  },
};

export const CustomFilters: Story = {
  args: {
    jobs: JOBS,
    filters: {
      [PACKAGE_FILTERS.CHANGED]: false,
      [PACKAGE_FILTERS.DUPLICATE]: true,
    },
  },
};

export const EmptyPackages: Story = {
  args: {
    jobs: [
      set(merge({}, currentJob), 'metrics.webpack.packages', {}),
      set(merge({}, baselineJob), 'metrics.webpack.packages', {}),
    ],
  },
};

export const EmptyFilteredPackages: Story = {
  args: {
    jobs: [
      set(merge({}, currentJob), 'metrics.webpack.packages', { 'package-a': { value: 100 } }),
      set(merge({}, baselineJob), 'metrics.webpack.packages', { 'package-a': { value: 100 } }),
    ],
  },
};

const JOBS_EMPTY_BASELINE = createJobs([{ webpack: currentStats }, { webpack: null }]);

export const EmptyBaseline: Story = {
  args: {
    jobs: JOBS_EMPTY_BASELINE,
  },
};
