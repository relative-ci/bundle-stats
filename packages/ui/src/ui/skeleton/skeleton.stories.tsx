import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Skeleton } from '.';

// Skeleton is a plain .jsx component with defaultProps instead of inline
// destructuring defaults, so TS can't infer its props as optional on its own.
const TypedSkeleton = Skeleton as unknown as React.ComponentType<
  {
    className?: string;
    as?: React.ElementType;
    block?: boolean;
  } & React.HTMLAttributes<HTMLElement>
>;

const meta = {
  title: 'UI/Skeleton',
  component: TypedSkeleton,
} satisfies Meta<typeof TypedSkeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MultipleTextLines: Story = {
  render: () => (
    <>
      <TypedSkeleton as="h1" style={{ outline: '1px solid magenta' }} />
      <TypedSkeleton as="h2" style={{ outline: '1px solid magenta' }} />
      <TypedSkeleton as="p" style={{ outline: '1px solid magenta' }} />
      <TypedSkeleton style={{ outline: '1px solid pink' }} />
    </>
  ),
};

export const Block: Story = {
  render: () => (
    <div style={{ outline: '1px solid magenta' }}>
      <TypedSkeleton as="div" block />
    </div>
  ),
};
