import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Toolbar } from '.';

// Toolbar is a plain .jsx component with defaultProps instead of inline
// destructuring defaults, so TS can't infer its props as optional on its own.
const TypedToolbar = Toolbar as unknown as React.ComponentType<{
  className?: string;
  children: React.ReactNode;
  renderActions?: (params: { actionClassName: string }) => React.ReactNode;
}>;

const meta = {
  title: 'UI/Toolbar',
  component: TypedToolbar,
  decorators: [getWrapperDecorator()],
} satisfies Meta<typeof TypedToolbar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <div>Content</div>,
  },
};

export const WithActions: Story = {
  args: {
    children: 'Content',
    renderActions: ({ actionClassName }) => (
      <>
        <div className={actionClassName}>Action 1</div>
        <div className={actionClassName}>Action 2</div>
      </>
    ),
  },
};
