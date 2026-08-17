import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { getWrapperDecorator } from '../../stories';
import { EntryInfo } from '.';

const RUNS = [
  {
    name: 'static/vendor.abcd1234.js',
    value: 982690,
  },
  {
    name: 'static/vendor.defg5678.js',
    value: 1022530,
    displayValue: '998.56KiB',
  },
];

const ITEM = {
  key: 'static/vendor.js',
  label: 'static/vendor.js',
  biggerIsBetter: false,
  changed: true,
};

const meta = {
  title: 'Components/EntryInfo',
  component: EntryInfo,
  decorators: [getWrapperDecorator()],
  args: {
    item: { ...ITEM, runs: RUNS as any },
    labels: ['Job #2', 'Job #1'],
    onClose: action('CLOSE'),
  },
} satisfies Meta<typeof EntryInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Added: Story = {
  args: {
    item: { ...ITEM, runs: [RUNS[0], null] as any },
  },
};

export const Removed: Story = {
  args: {
    item: { ...ITEM, runs: [null, RUNS[1]] as any },
  },
};

export const WithCustomContent: Story = {
  args: {
    tags: <span>Critical tags</span>,
  },
  render: (args) => (
    <EntryInfo {...args}>
      <div>
        <EntryInfo.Meta label="Meta 1">value 1</EntryInfo.Meta>
        <EntryInfo.Meta label="Meta 2">value 2</EntryInfo.Meta>
      </div>
      <div>custom entry info 1</div>
      <div>custom entry info 2</div>
    </EntryInfo>
  ),
};
