import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { createJobs } from '@bundle-stats/utils';

/* eslint-disable import/no-unresolved, import/no-relative-packages */
import currentData from '../../../../fixtures/home-assistant/current.json';
import baselineData from '../../../../fixtures/home-assistant/baseline.json';
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

const meta: Meta<typeof App> = {
  title: 'App/HomeAssistant',
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

/**
 * stack: Vite, yarn
 *
 * - GitHub: https://github.com/home-assistant/frontend
 * - RelativeCI project: https://app.relative-ci.com/projects/ZyS69RCzSjYaQA6vUq06
 */
export const Default: Story = {
  render: (args) => <App jobs={JOBS} {...args} />,
};
