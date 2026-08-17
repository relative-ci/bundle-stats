import type { Meta, StoryObj } from '@storybook/react';

import { AssetNotPredictive } from '.';

const meta = {
  title: 'Components/AssetNotPredictive',
  component: AssetNotPredictive,
} satisfies Meta<typeof AssetNotPredictive>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithRuns: Story = {
  args: {
    runs: [
      {
        name: 'static/vendor.abcd1234.js',
        value: 1024 * 1024 - 1,
      },
      {
        name: 'static/vendor.abcd1234.js',
        value: 1024 * 1024,
      },
    ] as any,
    labels: ['Job 2', 'Job 1'],
  },
};
