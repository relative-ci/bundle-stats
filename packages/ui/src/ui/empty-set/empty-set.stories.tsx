import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { EmptySet } from '.';

// EmptySet is a plain .jsx component with defaultProps instead of inline
// destructuring defaults, so TS can't infer its props as optional on its own.
const TypedEmptySet = EmptySet as unknown as React.ComponentType<{
  resources: string;
  filtered: boolean;
  handleResetFilters?: () => void;
  handleViewAll?: () => void;
}>;

const meta = {
  title: 'UI/EmptySet',
  component: TypedEmptySet,
  decorators: [getWrapperDecorator()],
  args: {
    resources: 'assets',
  },
} satisfies Meta<typeof TypedEmptySet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    filtered: true,
    handleResetFilters: () => console.log('RESET_FILTERS'),
    handleViewAll: () => console.log('VIEW_ALL'),
  },
};

export const Empty: Story = {
  args: {
    filtered: false,
  },
};
