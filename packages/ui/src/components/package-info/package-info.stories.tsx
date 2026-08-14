import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { getWrapperDecorator } from '../../stories';
import { PackageInfo } from '.';

const RUNS = [
  {
    name: 'lodash',
    value: 279901,
    path: '../node_modules/lodash',
  },
  {
    name: 'lodash',
    value: 283712,
    displayValue: '277.06KiB',
    path: '../node_modules/lodash',
  },
];

const meta = {
  title: 'Components/PackageInfo',
  component: PackageInfo,
  decorators: [getWrapperDecorator()],
} satisfies Meta<typeof PackageInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    item: {
      label: 'lodash',
      duplicate: true,
      runs: RUNS as any,
    },
    labels: ['Job #2', 'Job #1'],
    onClose: action('CLOSE'),
  },
};
