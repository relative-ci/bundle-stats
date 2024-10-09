import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Tabs } from '.';

const meta: Meta<typeof Tabs> = {
  title: 'UI/Tabs',
  component: Tabs,
  decorators: [getWrapperDecorator()],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs>
      <Tabs.Item isTabActive>Option A</Tabs.Item>
      <Tabs.Item>Option B</Tabs.Item>
      <Tabs.Item>Option C</Tabs.Item>
    </Tabs>
  ),
};
