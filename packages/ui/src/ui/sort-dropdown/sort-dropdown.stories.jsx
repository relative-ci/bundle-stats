import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { SortDropdown } from '.';

const stories = storiesOf('UI/SortDropdown', module);
stories.addDecorator(getWrapperDecorator({ paddingLeft: '200px' }));

stories.add('default', () => (
  <SortDropdown
    onChange={(state) => {
      console.log(state); // eslint-disable-line no-console
    }}
    fields={{
      filename: {
        label: 'Filename',
      },
      size: {
        label: 'Size',
      },
    }}
    field="size"
  />
));
