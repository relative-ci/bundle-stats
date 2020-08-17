import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Box } from '../../ui';
import { FlexStack } from '.';

const stories = storiesOf('Layout/FlexStack', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <FlexStack>
    <Box>Lorem ipsum 1</Box>
    <Box>Lorem ipsum 2</Box>
    {null}
    Lorem ipsum 3
  </FlexStack>
));

stories.add('with custom wrapper', () => (
  <FlexStack as="main" className="wrapper">
    <Box>Lorem ipsum 1</Box>
    <Box>Lorem ipsum 2</Box>
  </FlexStack>
));

stories.add('with large space', () => (
  <FlexStack space="large">
    <Box>Lorem ipsum 1</Box>
    <Box>Lorem ipsum 2</Box>
    <Box>Lorem ipsum 3</Box>
  </FlexStack>
));

stories.add('with nested stack', () => (
  <FlexStack space="large">
    <Box>Lorem ipsum 1</Box>
    <Box>Lorem ipsum 2</Box>
    <FlexStack space="small">
      <Box>Lorem ipsum 3.1</Box>
      <Box>Lorem ipsum 3.2</Box>
    </FlexStack>
  </FlexStack>
));

stories.add('single item', () => (
  <FlexStack>
    <Box>Lorem ipsum</Box>
  </FlexStack>
));
