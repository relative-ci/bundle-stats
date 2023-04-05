import React from 'react';

import { getWrapperDecorator } from '../../stories';
import { SortDropdown } from '.';

export default {
  title: 'UI/SortDropdown',
  component: SortDropdown,
  decorators: [getWrapperDecorator({ paddingLeft: '200px' })],
};

export const Default = () => (
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
);
