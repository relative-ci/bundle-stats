import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Table } from '../table';
import { Box } from '.';

const stories = storiesOf('UI/Box', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <Box>
    <p>Lorem ipsum</p>
  </Box>
));

stories.add('with table', () => (
  <Box>
    <Table
      headers={['Col A', 'Col B', 'Col C']}
      rows={[
        {
          cells: ['a1', 'b1', 'c1'],
        },
        {
          cells: ['a2', 'b2', 'c2'],
        },
        {
          cells: ['a3', 'b3', 'c3'],
        },
      ]}
    />
  </Box>
));
