import React from 'react';
import {
  ASSET_ENTRY_TYPE,
  ASSET_FILE_TYPE,
  ASSET_FILTERS,
  FILE_TYPE_JS,
  createJobs,
} from '@bundle-stats/utils';
import merge from 'lodash/merge';
import set from 'lodash/set';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

/* eslint-disable import/no-relative-packages */
import baselineStats from '../../../../../fixtures/webpack-stats.baseline.json';
import currentStats from '../../../../../fixtures/webpack-stats.current.json';
/* eslint-enable import/no-relative-packages */
import { getWrapperDecorator } from '../../stories';
import { BundleAssets } from '.';

const JOBS = createJobs([{ webpack: currentStats }, { webpack: baselineStats }]);
const [currentJob, baselineJob] = JOBS;
const setState = (params) => console.info(params);

const meta: Meta<typeof BundleAssets> = {
  title: 'Components/BundleAssets',
  component: BundleAssets,
  decorators: [getWrapperDecorator()],
  args: {
    setState: action('STATE'),
  },
};

export default meta;

type Story = StoryObj<typeof BundleAssets>;

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
      [`${ASSET_ENTRY_TYPE}.${ASSET_FILTERS.ENTRY}`]: true,
      [`${ASSET_FILE_TYPE}.${FILE_TYPE_JS}`]: true,
    },
  },
};

export const EmptyBaseline: Story = {
  args: {
    jobs: createJobs([{ webpack: currentStats }, {}]),
  },
};

export const NoAssets: Story = {
  args: {
    jobs: JOBS.map((job) => set(merge({}, job), 'metrics.webpack.assets', {})),
  },
};

export const EmptyFilteredData: Story = {
  args: {
    jobs: [
      set(merge({}, currentJob), 'metrics.webpack.assets', { 'main.js': { value: 100 } }),
      set(merge({}, baselineJob), 'metrics.webpack.assets', { 'main.js': { value: 100 } }),
    ],
    search: 'vendors',
  },
};

export const NotPredictive: Story = {
  args: {
    jobs: [
      set(merge({}, currentJob), 'metrics.webpack.assets', {
        'static/js/not-predictive.js': {
          name: 'static/js/not-predictive.93191a1.js',
          value: 2989,
        },
      }),
      set(merge({}, baselineJob), 'metrics.webpack.assets', {
        'static/js/not-predictive.js': {
          name: 'static/js/not-predictive.93191a1.js',
          value: 2988,
        },
      }),
    ],
  },
};
