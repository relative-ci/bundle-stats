import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { JobName } from '.';

// JobName is a plain .jsx component with defaultProps instead of inline
// destructuring defaults, so TS can't infer its props as optional on its own.
const TypedJobName = JobName as unknown as React.ComponentType<{
  as?: React.ElementType;
  title?: string;
  internalBuildNumber?: number;
  children?: React.ReactNode;
}>;

const meta = {
  title: 'Components/JobName',
  component: TypedJobName,
  decorators: [getWrapperDecorator({ padding: '64px' })],
  args: {
    title: 'View job details',
  },
} satisfies Meta<typeof TypedJobName>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    internalBuildNumber: 10,
  },
};

export const CustomComponent: Story = {
  args: {
    internalBuildNumber: 10,
    as: 'strong',
  },
};

export const Render: Story = {
  args: {
    children: <a href="https://relative-ci.com/test">#10</a>,
  },
};
