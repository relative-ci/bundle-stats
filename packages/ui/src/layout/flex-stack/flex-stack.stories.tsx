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

export const WithLargeGap: Story = {
  args: {
    gap: 'large',
    children: (
      <>
        <Box outline>Lorem ipsum 1</Box>
        <Box outline>Lorem ipsum 2</Box>
        <Box outline>Lorem ipsum 3</Box>
      </>
    ),
  },
};

export const WithNestedStack: Story = {
  args: {
    gap: 'large',
    children: (
      <>
        <Box outline>Lorem ipsum 1</Box>
        <Box outline>Lorem ipsum 2</Box>
        <FlexStack gap="small">
          <Box outline>Lorem ipsum 3.1</Box>
          <Box outline>Lorem ipsum 3.2</Box>
        </FlexStack>
      </>
    ),
  },
};

export const SingleItem: Story = {
  args: {
    children: <Box outline>Lorem ipsum</Box>,
  },
};

export const WithDirectionColumn: Story = {
  args: {
    direction: 'column',
    gap: 'medium',
    children: (
      <>
        <Box outline>Lorem ipsum 1</Box>
        <Box outline>Lorem ipsum 2</Box>
        <Box outline>Lorem ipsum 3</Box>
      </>
    ),
  },
};

export const WithDirectionRowReverse: Story = {
  args: {
    direction: 'row-reverse',
    gap: 'medium',
    children: (
      <>
        <Box outline>Lorem ipsum 1</Box>
        <Box outline>Lorem ipsum 2</Box>
        <Box outline>Lorem ipsum 3</Box>
      </>
    ),
  },
};

export const WithWrap: Story = {
  args: {
    wrap: 'wrap',
    gap: 'medium',
    style: { maxWidth: '320px' },
    children: (
      <>
        <Box outline>Lorem ipsum 1</Box>
        <Box outline>Lorem ipsum 2</Box>
        <Box outline>Lorem ipsum 3</Box>
        <Box outline>Lorem ipsum 4</Box>
        <Box outline>Lorem ipsum 5</Box>
      </>
    ),
  },
};

export const WithAlignItems: Story = {
  args: {
    alignItems: 'center',
    gap: 'medium',
    children: (
      <>
        <h1>Title</h1>
        <a href="#test">Option 1</a>
      </>
    ),
  },
};

export const WithJustifyContent: Story = {
  args: {
    justifyContent: 'space-between',
    gap: 'medium',
    children: (
      <>
        <Box outline>Lorem ipsum 1</Box>
        <Box outline>Lorem ipsum 2</Box>
        <Box outline>Lorem ipsum 3</Box>
      </>
    ),
  },
};
