import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Table } from '.';

const stories = storiesOf('UI/Table', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => {
  const rows = [
    {
      cells: ['a1', 'b1', 'c1'],
    },
    {
      cells: ['a2', 'b2', 'c2'],
    },
    {
      cells: ['a3', 'b3', 'c3'],
    },
  ];

  return <Table rows={rows} />;
});

stories.add('empty', () => (
  <Table rows={[]} />
));

stories.add('empty with custom element', () => (
  <Table
    rows={[]}
    emptyMessage={(
      <p style={{ outline: '1px solid lightgray' }}>
        No items available
      </p>
    )}
  />
));

stories.add('with headers', () => {
  const headers = ['Col A', 'Col B', 'Col C'];
  const rows = [
    {
      cells: ['a1', 'b1', 'c1'],
    },
    {
      cells: ['a2', 'b2', 'c2'],
    },
    {
      cells: ['a3', 'b3', 'c3'],
    },
  ];

  return <Table headers={headers} rows={rows} />;
});

stories.add('with multiple rows header', () => {
  const headers = [
    [' ', { children: 'Colspan', colSpan: 2 }],
    ['Col A', 'Col B', 'Col C'],
  ];

  const rows = [
    {
      cells: ['a1', 'b1', 'c1'],
    },
    {
      cells: ['a2', 'b2', 'c2'],
    },
    {
      cells: ['a3', 'b3', 'c3'],
    },
  ];

  return <Table headers={headers} rows={rows} />;
});

stories.add('with outline', () => {
  const headers = ['Col A', 'Col B', 'Col C'];
  const rows = [
    {
      cells: ['a1', 'b1', 'c1'],
    },
    {
      cells: ['a2', 'b2', 'c2'],
    },
    {
      cells: ['a3', 'b3', 'c3'],
    },
  ];

  return <Table outline headers={headers} rows={rows} />;
});


stories.add('with row headers', () => {
  const rows = [
    {
      header: 'row 1',
      cells: ['a1', 'b1', 'c1'],
    },
    {
      header: 'row 2',
      cells: ['a2', 'b2', 'c2'],
    },
    {
      header: 'row 3',
      cells: ['a3', 'b3', 'c3'],
    },
  ];

  return <Table rows={rows} />;
});

stories.add('with custom content and attributes', () => {
  const headers = [
    ' ',
    {
      children: 'Col A (right)',
      style: {
        textAlign: 'right',
      },
    },
    {
      children: 'Col B (center)',
      style: {
        textAlign: 'center',
      },
    },
    {
      children: 'Col C (underline)',
      style: {
        textDecoration: 'underline',
      },
    },
  ];
  const rows = [
    {
      header: (<strong>row 1</strong>),
      cells: [
        (<em>a1</em>),
        {
          children: 'b1',
          style: {
            color: 'red',
            textAlign: 'center',
          },
        },
        'c1',
      ],
    },
    {
      style: {
        color: 'blue',
        fontSize: '1.5em',
      },
      header: (<strong>row 2</strong>),
      cells: ['a2', 'b2', 'c2'],
    },
    {
      header: (<strong>row 2</strong>),
      cells: ['a3', 'b3', 'c3'],
    },
  ];

  return <Table headers={headers} rows={rows} />;
});
