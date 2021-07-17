import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Table } from '../../ui';
import { Box } from '.';

const stories = storiesOf('Layout/Box', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => <Box style={{ outline: '1px dotted magenta' }}>Lorem ipsum</Box>);

stories.add('with padding', () => (
  <Box padding="medium" style={{ outline: '1px dotted magenta' }}>Lorem ipsum</Box>
));

stories.add('with horizontal padding', () => (
  <Box horizontalPadding="medium" style={{ outline: '1px dotted magenta' }}>Lorem ipsum</Box>
));

stories.add('with vertical padding', () => (
  <Box verticalPadding="medium" style={{ outline: '1px dotted magenta' }}>Lorem ipsum</Box>
));

stories.add('with horizontal & vertical padding', () => (
  <Box padding={['xxsmall', 'medium']} style={{ outline: '1px dotted magenta' }}>Lorem ipsum</Box>
));

stories.add('with outline', () => (
  <Box padding="large" outline>
    Lorem ipsum
  </Box>
));
