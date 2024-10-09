import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Tabs, TabItem } from '.';

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
      <TabItem isTabActive>Option A</TabItem>
      <TabItem>Option B</TabItem>
      <TabItem>Option C</TabItem>
    </Tabs>
  ),
};
