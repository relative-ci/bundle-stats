import type { Meta, StoryObj } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { MetricsTableExport } from '.';

const meta: Meta<typeof MetricsTableExport> = {
  title: 'Components/MetricsTableExport',
  component: MetricsTableExport,
  decorators: [getWrapperDecorator()],
};

export default meta;

type Story = StoryObj<typeof meta>;

const ITEMS = [
  {
    label: 'Hey',
    runs: [
      { value: 1, name: 'a' },
      { value: 2, name: 'b' },
    ],
  },
];

export const Default: Story = {
  args: {
    items: ITEMS,
  },
};
