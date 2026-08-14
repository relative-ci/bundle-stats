import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Box } from '../box';
import { Stack } from '.';

const meta = {
  title: 'Layout/Stack',
  component: Stack,
  decorators: [getWrapperDecorator()],
} satisfies Meta<typeof Stack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <Box outline>Lorem ipsum 1</Box>
        <Box outline>Lorem ipsum 2</Box>
        {null}
        Lorem ipsum 3
      </>
    ),
  },
};

export const WithCustomWrapper: Story = {
  args: {
    as: 'main',
    className: 'wrapper',
    children: (
      <>
        <Box outline>Lorem ipsum 1</Box>
        <Box outline>Lorem ipsum 2</Box>
      </>
    ),
  },
};

export const WithSpace: Story = {
  args: {
    space: 'large',
    children: (
      <>
        <Box outline>Lorem ipsum 1</Box>
        <Box outline>Lorem ipsum 2</Box>
        <Box outline>Lorem ipsum 3</Box>
      </>
    ),
  },
};

export const WithNestedStacks: Story = {
  args: {
    space: 'large',
    children: (
      <>
        <Box outline>Lorem ipsum 1</Box>
        <Box outline>Lorem ipsum 2</Box>
        <Stack space="small">
          <Box outline>Lorem ipsum 3.1</Box>
          <Box outline>Lorem ipsum 3.2</Box>
        </Stack>
      </>
    ),
  },
};

export const WithSingleItem: Story = {
  args: {
    children: <Box outline>Lorem ipsum</Box>,
  },
};
