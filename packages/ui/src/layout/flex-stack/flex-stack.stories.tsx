import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Box } from '../box';
import { FlexStack } from '.';

const meta = {
  title: 'Layout/FlexStack',
  component: FlexStack,
  decorators: [getWrapperDecorator()],
} satisfies Meta<typeof FlexStack>;

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

export const withCustomWrapper: Story = {
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

export const withLargeSpace: Story = {
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

export const withNestedStack: Story = {
  args: {
    space: 'large',
    children: (
      <>
        <Box outline>Lorem ipsum 1</Box>
        <Box outline>Lorem ipsum 2</Box>
        <FlexStack space="small">
          <Box outline>Lorem ipsum 3.1</Box>
          <Box outline>Lorem ipsum 3.2</Box>
        </FlexStack>
      </>
    ),
  },
};

export const singleItem: Story = {
  args: {
    children: <Box outline>Lorem ipsum</Box>,
  },
};

export const withAlignItems: Story = {
  args: {
    alignItems: 'center',
    space: 'medium',
    children: (
      <>
        <h1>Title</h1>
        <a href="#test">Option 1</a>
      </>
    ),
  },
};
