import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Dropdown, DropdownItem } from '.';

const meta = {
  title: 'UI/Dropdown',
  component: Dropdown,
  decorators: [getWrapperDecorator()],
  args: {
    glyph: 'filter',
    label: 'Toggle',
    children: (
      <>
        <DropdownItem>Option 1</DropdownItem>
        <DropdownItem>Option 2</DropdownItem>
        <DropdownItem as="a" href="#">
          Option 3
        </DropdownItem>
        <DropdownItem as="button" onClick={() => alert('Select option')}>
          Option 4
        </DropdownItem>
      </>
    ),
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
