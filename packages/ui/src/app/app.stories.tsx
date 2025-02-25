import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { createJobs } from '@bundle-stats/utils';
import merge from 'lodash/merge';

/* eslint-disable import/no-unresolved, import/no-relative-packages */
import currentData from '../../../../fixtures/job.current';
import baselineData from '../../../../fixtures/job.baseline';
/* eslint-enable import/no-unresolved, import/no-relative-packages */
import { App } from '.';

const CURRENT_SOURCE = {
  webpack: {
    ...currentData.rawData.webpack,
    builtAt: currentData.createdAt,
    hash: currentData.commit,
  },
};

const BASELINE_SOURCE = {
  webpack: {
    ...baselineData.rawData.webpack,
    builtAt: baselineData.createdAt,
    hash: baselineData.commit,
  },
};

const JOBS = createJobs([CURRENT_SOURCE, BASELINE_SOURCE]);

const MULTIPLE_JOBS = createJobs([
  CURRENT_SOURCE,
  BASELINE_SOURCE,
  {
    webpack: {
      ...baselineData.rawData.webpack,
      builtAt: baselineData.createdAt,
      hash: 'aaaa1111',
      assets: baselineData.rawData.webpack.assets.filter((asset) => asset.name.match(/.(css|js)$/)),
      modules: baselineData.rawData.webpack.modules.slice(0, 100),
    },
  },
]);

const [CURRENT_JOB, BASELINE_JOB] = JOBS;

const meta: Meta<typeof App> = {
  title: 'App',
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    version: '1.0',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => <App jobs={JOBS} {...args} />,
};

export const NoInsights: Story = {
  render: (args) => (
    <App
      jobs={[
        {
          ...CURRENT_JOB,
          insights: undefined,
        },
        BASELINE_JOB,
      ]}
      {...args}
    />
  ),
};

export const AssetMetaChanges: Story = {
  render: (args) => {
    const current = merge({}, CURRENT_SOURCE);
    const baseline = merge({}, CURRENT_SOURCE);

    current.webpack.assets.push({
      name: 'assets/js/vendors-auth.1a278dc.js',
      size: 26364,
    });
    current.webpack.chunks.push({
      id: 100,
      entry: false,
      initial: false,
      files: ['assets/js/vendors-auth.1a278dc.js'],
      names: ['vendors-auth'],
    });

    baseline.webpack.assets.push({
      name: 'assets/js/vendors-auth.1a278dc.js',
      size: 26364,
    });
    baseline.webpack.chunks.push({
      id: 100,
      entry: false,
      initial: true,
      files: ['assets/js/vendors-auth.1a278dc.js'],
      names: ['vendors-auth'],
    });

    return <App jobs={createJobs([current, baseline])} {...args} />;
  },
};

export const NoBaseline: Story = {
  render: (args) => <App jobs={createJobs([CURRENT_SOURCE])} {...args} />,
};

export const EmptyBaseline: Story = {
  render: (args) => <App jobs={createJobs([CURRENT_SOURCE, { webpack: null }])} {...args} />,
};

export const MultipleBaselines: Story = {
  render: (args) => <App jobs={MULTIPLE_JOBS} {...args} />,
};

export const Empty: Story = {
  render: (args) => <App {...args} />,
};
