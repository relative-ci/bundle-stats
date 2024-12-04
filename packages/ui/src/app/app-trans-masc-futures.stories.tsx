import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { createJobs } from '@bundle-stats/utils';

/* eslint-disable import/no-unresolved, import/no-relative-packages */
import currentData from '../../../../fixtures/trans-masc-futures/current.json';
import baselineData from '../../../../fixtures/trans-masc-futures/baseline.json';
import { metaBaseline, metaCurrent } from '../../../../fixtures/meta';
/* eslint-enable import/no-unresolved, import/no-relative-packages */
import { App } from '.';

const CURRENT_SOURCE = {
  ...metaCurrent,
  webpack: currentData,
};

const BASELINE_SOURCE = {
  ...metaBaseline,
  webpack: baselineData,
};

const JOBS = createJobs([CURRENT_SOURCE, BASELINE_SOURCE]);

/**
 * stack: Next.JS, pnpm
 *
 * - GitHub: https://github.com/weareinreach/TransMascFutures
 * - RelativeCI project: https://app.relative-ci.com/projects/KjzseHt4clXSZ8GDcFc7
 */
const meta: Meta<typeof App> = {
  title: 'App/TransMascFutures',
  component: App,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    version: '1.0',
  },
};

export default meta;

type Story = StoryObj<typeof App>;

export const Default: Story = {
  render: (args) => <App jobs={JOBS} {...args} />,
};
