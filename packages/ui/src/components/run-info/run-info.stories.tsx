import type { Meta, StoryObj } from '@storybook/react';

import { RunInfo } from './run-info';

const meta = {
  title: 'Components/RunInfo',
  component: RunInfo,
  args: {
    id: 'webpack.totalSizeByTypeALL',
    size: 'medium',
  },
  argTypes: {
    size: {
      options: ['small', 'medium', 'large', 'xlarge'],
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof RunInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Bundle Size',
    current: '120KiB',
    baseline: '100KiB',
    delta: '+20%',
    deltaType: 'HIGH_NEGATIVE',
  },
};

export const DeltaPercentage: Story = {
  args: {
    ...Default.args,
    deltaPercentage: '+20KiB',
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
