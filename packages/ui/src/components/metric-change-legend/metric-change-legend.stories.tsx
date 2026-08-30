import type { Meta, StoryObj } from '@storybook/react';

import { MetricChangeLegend } from '.';

const meta = {
  title: 'Components/MetricChangeLegend',
  component: MetricChangeLegend,
} satisfies Meta<typeof MetricChangeLegend>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
