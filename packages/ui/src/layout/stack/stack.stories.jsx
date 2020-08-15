import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Box } from '../../ui';
import { Stack } from '.';

const stories = storiesOf('Layout/Stack', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <Stack>
    <Box>Lorem ipsum 1</Box>
    <Box>Lorem ipsum 2</Box>
  </Stack>
));

stories.add('with custom wrapper', () => (
  <Stack as="main" className="wrapper">
    <Box>Lorem ipsum 1</Box>
    <Box>Lorem ipsum 2</Box>
  </Stack>
));

stories.add('with large space', () => (
  <Stack space="large">
    <Box>Lorem ipsum 1</Box>
    <Box>Lorem ipsum 2</Box>
    <Box>Lorem ipsum 3</Box>
  </Stack>
));

stories.add('with nested stack', () => (
  <Stack space="large">
    <Box>Lorem ipsum 1</Box>
    <Box>Lorem ipsum 2</Box>
    <Stack space="small">
      <Box>Lorem ipsum 3.1</Box>
      <Box>Lorem ipsum 3.2</Box>
    </Stack>
  </Stack>
));

stories.add('single item', () => (
  <Stack>
    <Box>Lorem ipsum</Box>
  </Stack>
));
