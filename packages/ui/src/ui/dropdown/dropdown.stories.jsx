import React from 'react';

import { getWrapperDecorator } from '../../stories';
import { Dropdown } from '.';

export default {
  title: 'UI/Dropdown',
  component: Dropdown,
  decorators: [getWrapperDecorator()],
};

export const Defualt = () => (
  <Dropdown glyph="filter" label="Toggle">
    <Dropdown.Item>
      Option 1
    </Dropdown.Item>
    <Dropdown.Item>
      Option 2
    </Dropdown.Item>
  </Dropdown>
);

export const WithRenderFn = () => (
  <Dropdown glyph="filter" label="Toggle">
    {({ MenuItem, menuItemClassName, menu }) => (
      <>
        <MenuItem className={menuItemClassName}>
          Option 1
        </MenuItem>
        <MenuItem className={menuItemClassName}>
          Option 2
        </MenuItem>
        <MenuItem className={menuItemClassName}>
          Option 3
        </MenuItem>
        <button type="button" onClick={menu.toggle}>
          Toggle dropdown
        </button>
      </>
    )}
  </Dropdown>
);
