/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { TableFilters } from '.';

const stories = storiesOf('UI/TableFilters', module);
stories.addDecorator(getWrapperDecorator({ paddingLeft: '200px' }));

stories.add('default', () => (
  <TableFilters
    onChange={(state) => {
      console.log(state); // eslint-disable-line no-console
    }}
    filters={{
      changed: {
        label: 'Changed',
        defaultValue: true,
      },
      entrypoint: {
        label: 'Entrypoint',
        defaultValue: false,
      },
      fileTypes: {
        label: 'File types',

        CSS: {
          label: 'CSS',
          defaultValue: true,
        },
        JS: {
          label: 'JSS',
          defaultValue: true,
        },
      },
    }}
  />
));

stories.add('disable options', () => (
  <TableFilters
    onChange={(state) => {
      console.log(state); // eslint-disable-line no-console
    }}
    filters={{
      changed: {
        label: 'Changed',
        defaultValue: false,
        disabled: true,
      },
      entrypoint: {
        label: 'Entrypoint',
        defaultValue: false,
      },
      fileTypes: {
        label: 'File types',

        CSS: {
          label: 'CSS',
          defaultValue: true,
        },
        JS: {
          label: 'JSS',
          defaultValue: true,
        },
      },
    }}
  />
));
