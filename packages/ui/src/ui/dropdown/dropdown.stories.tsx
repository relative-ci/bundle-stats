import React from 'react';
import { Meta } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Dropdown, DropdownItem } from '.';

export default {
  title: 'UI/Dropdown',
  component: Dropdown,
  decorators: [getWrapperDecorator()],
} as Meta;

export const Defualt = () => (
  <Dropdown glyph="filter" label="Toggle">
    <DropdownItem>Option 1</DropdownItem>
    <DropdownItem>Option 2</DropdownItem>
  </Dropdown>
);

export const Disabled = () => (
  <Dropdown glyph="filter" label="Toggle" disabled>
    <DropdownItem>Option 1</DropdownItem>
    <DropdownItem>Option 2</DropdownItem>
  </Dropdown>
);
