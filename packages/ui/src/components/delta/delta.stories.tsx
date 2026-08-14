import type { Meta, StoryObj } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Delta } from '.';

const meta = {
  title: 'Components/Delta',
  component: Delta,
  decorators: [getWrapperDecorator()],
} satisfies Meta<typeof Delta>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    displayValue: '20%',
    deltaType: 'POSITIVE',
  },
};

export const Negative: Story = {
  args: {
    displayValue: '20%',
    deltaType: 'NEGATIVE',
  },
};

export const SlightlyNegative: Story = {
  args: {
    displayValue: '1%',
    deltaType: 'LOW_NEGATIVE',
  },
};

export const SlightlyPositive: Story = {
  args: {
    displayValue: '1%',
    deltaType: 'LOW_POSITIVE',
  },
};

export const Empty: Story = {
  args: {
    displayValue: '0%',
    deltaType: 'NO_CHANGE',
  },
};

export const Inverted: Story = {
  args: {
    displayValue: '1%',
    deltaType: 'LOW_NEGATIVE',
    inverted: true,
  },
};
