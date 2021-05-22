import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Icon } from '.';

const stories = storiesOf('UI/Icon', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => <Icon glyph={Icon.ICONS.ARROW} />);

stories.add('with size', () => <Icon glyph={Icon.ICONS.ARROW} size={Icon.SIZE_LARGE} />);

stories.add('all', () => (
  <>
    {Object.values(Icon.ICONS).map((glyph) => (
      <span style={{ margin: '0.3rem' }}>
        <Icon glyph={glyph} key={glyph} />
      </span>
    ))}
  </>
));
