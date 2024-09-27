import type { Meta, StoryObj } from '@storybook/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';

import { getWrapperDecorator } from '../../stories';
import { MetricsTableOptions } from '.';

const meta: Meta<typeof MetricsTableOptions> = {
  title: 'Components/MetricsTableOptions',
  component: MetricsTableOptions,
  decorators: [getWrapperDecorator()],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    handleResetFilters: action('RESET'),
    handleViewAll: action('VIEW_ALL'),
  },
};
