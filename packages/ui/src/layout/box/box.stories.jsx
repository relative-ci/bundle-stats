import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Table } from '../../ui';
import { Box } from '.';

const stories = storiesOf('Layout/Box', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => <Box>Lorem ipsum</Box>);

stories.add('with padding', () => <Box padding="medium">Lorem ipsum</Box>);

stories.add('with outline', () => (
  <Box padding="large" outline>
    Lorem ipsum
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
