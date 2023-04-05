import React from 'react';

import { getWrapperDecorator } from '../../stories';
import { Tabs } from '.';

export default {
  title: 'UI/Tabs',
  component: Tabs,
  decorators: [getWrapperDecorator()],
};

export const Default = () => (
  <Tabs>
    <Tabs.Item isTabActive>Option A</Tabs.Item>
    <Tabs.Item>Option B</Tabs.Item>
    <Tabs.Item>Option C</Tabs.Item>
  </Tabs>
);
