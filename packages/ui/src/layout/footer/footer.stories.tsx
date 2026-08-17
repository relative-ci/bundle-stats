import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { Footer } from '.';

// Footer is a plain .jsx component with defaultProps instead of inline
// destructuring defaults, so TS can't infer its props as optional on its own.
const TypedFooter = Footer as unknown as React.ComponentType<{
  className?: string;
  version?: string;
}>;

const meta = {
  title: 'Layout/Footer',
  component: TypedFooter,
  decorators: [getWrapperDecorator()],
} satisfies Meta<typeof TypedFooter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithVersion: Story = {
  args: {
    version: '1.0.0',
  },
};
