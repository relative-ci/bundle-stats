import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Tooltip } from '.';

const stories = storiesOf('UI/Tooltip', module);
stories.addDecorator(getWrapperDecorator({ padding: '64px' }));

stories.add('default', () => (
  <Tooltip title="View job #100">
    Job #100
  </Tooltip>
));

stories.add('darkMode:false', () => (
  <Tooltip title="View job #100" darkMode={false}>
    Job #100
  </Tooltip>
));
