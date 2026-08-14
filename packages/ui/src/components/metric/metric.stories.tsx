import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Delta } from '../delta';
import { Metric } from '.';

const meta = {
  title: 'Components/Metric',
  component: Metric,
  decorators: [getWrapperDecorator({ maxWidth: '200px' })],
} satisfies Meta<typeof Metric>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: '100',
  },
};

export const WithUnit: Story = {
  args: {
    value: '100',
    unit: 'KiB',
  },
};

export const WithDelta: Story = {
  args: {
    ...WithUnit.args,
    children: <Delta displayValue="+10%" deltaType="POSITIVE" />,
  },
};

export const Inline: Story = {
  args: {
    ...WithDelta.args,
    inline: true,
  },
};
