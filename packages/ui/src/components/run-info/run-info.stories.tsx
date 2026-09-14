import type { Meta, StoryObj } from '@storybook/react';

import { RunInfo } from './run-info';

const meta = {
  title: 'Components/RunInfo',
  component: RunInfo,
  args: {
    id: 'webpack.totalSizeByTypeALL',
    size: 'medium',
    loading: false,
    showBaseline: true,
    showDelta: true,
  },
  argTypes: {
    size: {
      options: ['small', 'medium', 'large', 'xlarge'],
      control: { type: 'select' },
    },
    loading: {
      control: { type: 'boolean' },
    },
    showBaseline: {
      control: { type: 'boolean' },
    },
    showDelta: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof RunInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Bundle Size',
    current: '678.91MiB',
    baseline: '123.45MiB',
    delta: '+555.46MiB',
    deltaPercentage: '+549.94%',
    deltaType: 'HIGH_NEGATIVE',
  },
};

export const SizeLarge: Story = {
  args: {
    ...Default.args,
    size: 'large',
  },
};

export const TitleHoverCard: Story = {
  args: {
    ...Default.args,
    titleHoverCard: 'Info',
  },
};

export const TitleTooltip: Story = {
  args: {
    ...Default.args,
    titleTooltip: 'Info',
  },
};

export const Loading: Story = {
  args: {
    title: 'Bundle Size',
    loading: true,
  },
};
