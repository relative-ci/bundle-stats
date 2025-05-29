import { action } from 'storybook/actions'; // eslint-disable-line
import { Meta, StoryObj } from '@storybook/react';

import { MetricsDisplayType } from '../../constants';
import { MetricsDisplaySelector } from '.';

const meta: Meta<typeof MetricsDisplaySelector> = {
  title: 'Components/MetricsDisplaySelector',
  component: MetricsDisplaySelector,
  args: {
    onSelect: action('SELECT'),
  },
} as Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: MetricsDisplayType.TABLE,
  },
};

export const TreemapGroups: Story = {
  args: {
    value: MetricsDisplayType.TREEMAP,
    groupBy: '',
    groups: {
      [MetricsDisplayType.TREEMAP]: ['folder'],
    },
  },
};
