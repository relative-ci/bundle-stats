import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { FiltersDropdown } from '.';

const stories = storiesOf('UI/FiltersDropdown', module);
stories.addDecorator(getWrapperDecorator({ paddingLeft: '200px' }));

stories.add('default', () => (
  <FiltersDropdown
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
          label: 'JS',
          defaultValue: true,
        },
        HTML: {
          label: 'HTML',
          defaultValue: true,
        },
      },
    }}
  />
));

stories.add('disable options', () => (
  <FiltersDropdown
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
          label: 'JS',
          defaultValue: true,
        },
        HTML: {
          label: 'HTML',
          defaultValue: true,
        },
      },
    }}
  />
));
