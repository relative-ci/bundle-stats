import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Tabs } from '.';

const stories = storiesOf('UI/Tabs', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <Tabs>
    <span isActive>
      Option A
    </span>
    <span>
      Option B
    </span>
    <span>
      Option C
    </span>
  </Tabs>
));
