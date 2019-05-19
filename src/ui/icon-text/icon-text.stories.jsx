import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { IconText } from '.';

const stories = storiesOf('UI/IconText', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <IconText glyph="branch">
    #010211
  </IconText>
));
