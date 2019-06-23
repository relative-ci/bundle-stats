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

stories.add('empty', () => {
  const rows = [];

  return <Table rows={rows} />;
});

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

stories.add('with custom alignment', () => {
  const headers = [
    ' ',
    {
      text: 'Col A (right)',
      options: {
        align: 'right',
      },
    },
    {
      text: 'Col B (center)',
      options: {
        align: 'center',
      },
    },
    'Col C',
  ];
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

  return <Table headers={headers} rows={rows} />;
});
