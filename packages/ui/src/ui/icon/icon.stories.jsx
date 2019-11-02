import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Icon } from '.';

const stories = storiesOf('UI/Icon', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <Icon glyph="branch" />
));

stories.add('all', () => (
  [
    'branch',
    'clock',
    'commit',
    'filter',
    'help',
    'package',
    'pr',
    'sort',
  ].map((glyph) => (
    <Icon glyph={glyph} />
  ))
));
