import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Box } from '../box';
import { FlexStack } from '.';

const stories = storiesOf('Layout/FlexStack', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <FlexStack>
    <Box outline>Lorem ipsum 1</Box>
    <Box outline>Lorem ipsum 2</Box>
    {null}
    Lorem ipsum 3
  </FlexStack>
));

stories.add('with custom wrapper', () => (
  <FlexStack as="main" className="wrapper">
    <Box outline>Lorem ipsum 1</Box>
    <Box outline>Lorem ipsum 2</Box>
  </FlexStack>
));

stories.add('with large space', () => (
  <FlexStack space="large">
    <Box outline>Lorem ipsum 1</Box>
    <Box outline>Lorem ipsum 2</Box>
    <Box outline>Lorem ipsum 3</Box>
  </FlexStack>
));

stories.add('with nested stack', () => (
  <FlexStack space="large">
    <Box outline>Lorem ipsum 1</Box>
    <Box outline>Lorem ipsum 2</Box>
    <FlexStack space="small">
      <Box outline>Lorem ipsum 3.1</Box>
      <Box outline>Lorem ipsum 3.2</Box>
    </FlexStack>
  </FlexStack>
));

stories.add('single item', () => (
  <FlexStack>
    <Box outline>Lorem ipsum</Box>
  </FlexStack>
));

stories.add('with alignItems', () => (
  <FlexStack alignItems="center" space="medium">
    <h1>Title</h1>
    <a href="#test">Option 1</a>
  </FlexStack>
));
