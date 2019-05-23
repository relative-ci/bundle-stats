import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Box } from '.';

const stories = storiesOf('UI/Box', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <Box>
    <p>Lorem ipsum</p>
  </Box>
));
