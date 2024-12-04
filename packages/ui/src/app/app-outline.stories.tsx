import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { createJobs } from '@bundle-stats/utils';

/* eslint-disable import/no-unresolved, import/no-relative-packages */
import currentData from '../../../../fixtures/outline/current.json';
import baselineData from '../../../../fixtures/outline/baseline.json';
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
 * stack: Vite, yarn
 *
 * - GitHub: https://github.com/outline/outline
 * - RelativeCI project:  https://app.relative-ci.com/projects/TMqufq6bi8qzsOjEHSWY
 */
const meta: Meta<typeof App> = {
  title: 'App/Outline',
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
