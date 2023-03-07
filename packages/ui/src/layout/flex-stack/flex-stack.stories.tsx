import React from 'react';

import { getWrapperDecorator } from '../../stories';
import { Box } from '../box';
import { FlexStack } from '.';

export default {
  title: 'Layout/FlexStack',
  component: FlexStack,
  decorators: [getWrapperDecorator()],
};

export const Default = () => (
  <FlexStack>
    <Box outline>Lorem ipsum 1</Box>
    <Box outline>Lorem ipsum 2</Box>
    {null}
    Lorem ipsum 3
  </FlexStack>
);

export const withCustomWrapper = () => (
  <FlexStack as="main" className="wrapper">
    <Box outline>Lorem ipsum 1</Box>
    <Box outline>Lorem ipsum 2</Box>
  </FlexStack>
);

export const withLargeSpace = () => (
  <FlexStack space="large">
    <Box outline>Lorem ipsum 1</Box>
    <Box outline>Lorem ipsum 2</Box>
    <Box outline>Lorem ipsum 3</Box>
  </FlexStack>
);

export const withNestedStack = () => (
  <FlexStack space="large">
    <Box outline>Lorem ipsum 1</Box>
    <Box outline>Lorem ipsum 2</Box>
    <FlexStack space="small">
      <Box outline>Lorem ipsum 3.1</Box>
      <Box outline>Lorem ipsum 3.2</Box>
    </FlexStack>
  </FlexStack>
);

export const singleItem = () => (
  <FlexStack>
    <Box outline>Lorem ipsum</Box>
  </FlexStack>
);

export const withAlignItems = () => (
  <FlexStack alignItems="center" space="medium">
    <h1>Title</h1>
    <a href="#test">Option 1</a>
  </FlexStack>
);
