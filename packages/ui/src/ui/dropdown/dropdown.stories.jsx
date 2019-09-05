import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Dropdown } from '.';

const stories = storiesOf('UI/Dropdown', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <Dropdown
    glyph="filter"
    label="Toggle"
  >
    <ul>
      <li>Option 1</li>
      <li>Option 2</li>
    </ul>
  </Dropdown>
));

stories.add('with right alignement', () => (
  <Dropdown
    glyph="filter"
    label="Toggle"
    align="right"
  >
    <ul>
      <li>Option 1</li>
      <li>Option 2</li>
    </ul>
  </Dropdown>
));

stories.add('with render function', () => (
  <Dropdown
    glyph="filter"
    label="Toggle"
  >
    {({ dropdownToggle }) => (
      <button type="button" onClick={dropdownToggle}>Toggle dropdown</button>
    )}
  </Dropdown>
));
