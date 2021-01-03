import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Icon, ICONS } from '.';

const stories = storiesOf('UI/Icon', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => <Icon glyph={ICONS.ARROW} />);

stories.add('all', () =>
  Object.values(ICONS).map((glyph) => <Icon glyph={glyph} key={glyph} />),
);
