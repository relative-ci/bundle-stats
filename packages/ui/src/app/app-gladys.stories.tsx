import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { createJobs } from '@bundle-stats/utils';

/* eslint-disable import/no-unresolved, import/no-relative-packages */
import currentData from '../../../../fixtures/gladys/current.json';
import baselineData from '../../../../fixtures/gladys/baseline.json';
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
 * stack: preact-cli, webpack, npm
 *
 * - GitHub: https://github.com/GladysAssistant/Gladys
 * - RelativeCI project: https://app.relative-ci.com/projects/PUROh8FAVkDKmpUrqr4u
 */
const meta: Meta<typeof App> = {
  title: 'App/Gladys',
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
