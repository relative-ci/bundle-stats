import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Popover } from '.';

const stories = storiesOf('UI/Popover', module);
stories.addDecorator(getWrapperDecorator({ padding: '64px' }));

stories.add('default', () => (
  <Popover content="View job #100">
    Job #100
  </Popover>
));
