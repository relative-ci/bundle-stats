import React from 'react';
import { storiesOf } from '@storybook/react';

import { Tooltip } from '.';

const stories = storiesOf('Tooltip', module);

stories.addDecorator(storyFn => (
  <div style={{ padding: '100px 100px' }}>
    {storyFn()}
  </div>
));

stories.add('default', () => (
  <Tooltip title="View job #100">
    Job #100
  </Tooltip>
));
