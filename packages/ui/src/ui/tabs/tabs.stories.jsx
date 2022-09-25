import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Tabs } from '.';

const stories = storiesOf('UI/Tabs', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <Tabs>
    <Tabs.Item isTabActive>Option A</Tabs.Item>
    <Tabs.Item>Option B</Tabs.Item>
    <Tabs.Item>Option C</Tabs.Item>
  </Tabs>
));
