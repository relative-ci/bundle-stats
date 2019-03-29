/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { TableFilters } from '.';

const stories = storiesOf('UI/TableFilters', module);
stories.addDecorator(storyFn => (
  <div
    style={{
      width: '100%',
      maxWidth: '480px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    {storyFn()}
  </div>
));

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
