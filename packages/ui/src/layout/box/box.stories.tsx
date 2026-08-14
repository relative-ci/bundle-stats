import type { Meta, StoryObj } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Box } from '.';

const meta = {
  title: 'Layout/Box',
  component: Box,
  decorators: [getWrapperDecorator()],
  args: {
    style: { border: '1px dotted magenta' },
    children: 'Lorem ipsum',
  },
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithPadding: Story = {
  args: {
    padding: 'medium',
  },
};

export const WithHorizontalPadding: Story = {
  args: {
    horizontalPadding: 'medium',
  },
};

export const WithVerticalPadding: Story = {
  args: {
    verticalPadding: 'medium',
  },
};

export const WithHorizontalAndVerticalPadding: Story = {
  args: {
    padding: ['xxsmall', 'medium'],
  },
};

export const WithOutline: Story = {
  args: {
    outline: true,
  },
};

export const WithOutlineHover: Story = {
  args: {
    outlineHover: true,
  },
};
