import React from 'react';
import type { Meta } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Box } from '../box';
import { Stack } from '.';

export default {
  title: 'Layout/Stack',
  component: Stack,
  decorators: [getWrapperDecorator()],
} as Meta<typeof Stack>;

export const Default = () => (
  <Stack>
    <Box outline>Lorem ipsum 1</Box>
    <Box outline>Lorem ipsum 2</Box>
    {null}
    Lorem ipsum 3
  </Stack>
);

export const WithCustomWrapper = () => (
  <Stack as="main" className="wrapper">
    <Box outline>Lorem ipsum 1</Box>
    <Box outline>Lorem ipsum 2</Box>
  </Stack>
);

export const WithSpace = () => (
  <Stack space="large">
    <Box outline>Lorem ipsum 1</Box>
    <Box outline>Lorem ipsum 2</Box>
    <Box outline>Lorem ipsum 3</Box>
  </Stack>
);

export const WithNestedStacks = () => (
  <Stack space="large">
    <Box outline>Lorem ipsum 1</Box>
    <Box outline>Lorem ipsum 2</Box>
    <Stack space="small">
      <Box outline>Lorem ipsum 3.1</Box>
      <Box outline>Lorem ipsum 3.2</Box>
    </Stack>
  </Stack>
);

export const WithSingleItem = () => (
  <Stack>
    <Box outline>Lorem ipsum</Box>
  </Stack>
);
