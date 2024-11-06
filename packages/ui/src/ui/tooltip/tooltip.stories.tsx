import type { Meta, StoryObj } from '@storybook/react';

import { Tooltip } from '.';
import css from './tooltip.stories.module.css';

const meta: Meta<typeof Tooltip> = {
  title: 'UI/Tooltip',
  component: Tooltip,
  args: {
    title: 'View job #123',
    children: 'Trigger',
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongTitle: Story = {
  args: {
    title:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam molestie neque id lectus mollis, et imperdiet libero porta.',
  },
};

export const DarkModeFalse: Story = {
  args: {
    darkMode: false,
  },
};

export const CustomTooltip: Story = {
  args: {
    tooltipClassName: css.customTooltip,
  },
};
