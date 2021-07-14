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

stories.add('with table', () => (
  <Box style={{ outline: '1px dotted magenta' }}>
    <Table>
      <Table.THead>
        <Table.Tr>
          <Table.Th>Col A</Table.Th>
          <Table.Th>Col B</Table.Th>
          <Table.Th>Col C</Table.Th>
        </Table.Tr>
      </Table.THead>
      <Table.TBody>
        <Table.Tr>
          <Table.Td>a1</Table.Td>
          <Table.Td>b1</Table.Td>
          <Table.Td>c1</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>a2</Table.Td>
          <Table.Td>b2</Table.Td>
          <Table.Td>c2</Table.Td>
        </Table.Tr>
        <Table.Tr>
          <Table.Td>a3</Table.Td>
          <Table.Td>b3</Table.Td>
          <Table.Td>c3</Table.Td>
        </Table.Tr>
      </Table.TBody>
    </Table>
  </Box>
));
