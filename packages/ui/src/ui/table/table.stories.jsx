import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Table } from '.';

const { THead, TBody, Td, Tr, Th } = Table;

const stories = storiesOf('UI/Table', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <Table>
    <TBody>
      <Tr>
        <Td>a1</Td>
        <Td>b1</Td>
        <Td>c1</Td>
      </Tr>
      <Tr>
        <Td>a2</Td>
        <Td>b2</Td>
        <Td>c2</Td>
      </Tr>
      <Tr>
        <Td>a3</Td>
        <Td>b3</Td>
        <Td>c3</Td>
      </Tr>
    </TBody>
  </Table>
));

stories.add('empty', () => <Table />);
stories.add('empty with custom element', () => (
  <Table emptyMessage={<p style={{ outline: '1px solid lightgray' }}>No items available</p>} />
));

stories.add('with headers', () => (
  <Table>
    <THead>
      <Tr>
        <Th>Col A</Th>
        <Th>Col B</Th>
        <Th>Col C</Th>
      </Tr>
    </THead>
    <TBody>
      <Tr>
        <Td>a1</Td>
        <Td>b1</Td>
        <Td>c1</Td>
      </Tr>
      <Tr>
        <Td>a2</Td>
        <Td>b2</Td>
        <Td>c2</Td>
      </Tr>
      <Tr>
        <Td>a3</Td>
        <Td>b3</Td>
        <Td>c3</Td>
      </Tr>
    </TBody>
  </Table>
));

stories.add('with multiple rows header', () => (
  <Table>
    <THead>
      <Tr>
        <Th> </Th>
        <Th colSpan={2}>Colspan</Th>
      </Tr>
      <Tr>
        <Th>Col A</Th>
        <Th>Col B</Th>
        <Th>Col C</Th>
      </Tr>
    </THead>
    <TBody>
      <Tr>
        <Td>a1</Td>
        <Td>b1</Td>
        <Td>c1</Td>
      </Tr>
      <Tr>
        <Td>a2</Td>
        <Td>b2</Td>
        <Td>c2</Td>
      </Tr>
      <Tr>
        <Td>a3</Td>
        <Td>b3</Td>
        <Td>c3</Td>
      </Tr>
    </TBody>
  </Table>
));

stories.add('with row headers', () => (
  <Table>
    <TBody>
      <Tr>
        <Th>row 1</Th>
        <Td>a1</Td>
        <Td>b1</Td>
        <Td>c1</Td>
      </Tr>
      <Tr>
        <Th>row 2</Th>
        <Td>a2</Td>
        <Td>b2</Td>
        <Td>c2</Td>
      </Tr>
      <Tr>
        <Th>row 3</Th>
        <Td>a3</Td>
        <Td>b3</Td>
        <Td>c3</Td>
      </Tr>
    </TBody>
  </Table>
));

stories.add('with custom content and attributes', () => (
  <Table>
    <THead>
      <Tr>
        <Th> </Th>
        <Th style={{ textAlign: 'right' }}>Col A (right)</Th>
        <Th style={{ textAlign: 'center' }}>Col B (center)</Th>
        <Th style={{ textDecoration: 'underline' }}>Col C(undefiner)</Th>
      </Tr>
    </THead>
    <TBody>
      <Tr>
        <Th><strong>row 1</strong></Th>
        <Td style={{ textAlign: 'right' }}>a1</Td>
        <Td style={{ textAlign: 'center', color: 'red' }}>b1</Td>
        <Td style={{ textDecoration: 'underline' }}>c1</Td>
      </Tr>
      <Tr style={{ color: 'blue', fontSize: '1.5em' }}>
        <Th><strong>row 2</strong></Th>
        <Td style={{ textAlign: 'right' }}>a2</Td>
        <Td style={{ textAlign: 'center'}}>b2</Td>
        <Td style={{ textDecoration: 'underline' }}>c2</Td>
      </Tr>
      <Tr>
        <Th><strong>row 3</strong></Th>
        <Td style={{ textAlign: 'right' }}>a3</Td>
        <Td style={{ textAlign: 'center'}}>b3</Td>
        <Td style={{ textDecoration: 'underline' }}>c3</Td>
      </Tr>
    </TBody>
  </Table>
));
