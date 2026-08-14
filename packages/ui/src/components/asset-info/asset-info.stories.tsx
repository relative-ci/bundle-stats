import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { getWrapperDecorator } from '../../stories';
import { AssetInfo } from '.';

const ITEM = {
  key: 'static/vendor.js',
  label: 'static/vendor.js',
  biggerIsBetter: false,
  changed: true,
  isAsset: true,
  isChunk: true,
  isEntry: true,
  isInitial: true,
  isNotPredictive: false,
  fileType: '',
  runs: [
    {
      name: 'static/vendor.abcd1234.js',
      value: 982690,
      chunkId: '1',
    },
    {
      name: 'static/vendor.defg5678.js',
      value: 1022530,
      displayValue: '998.56KiB',
      chunkId: '2',
    },
  ],
};

const meta = {
  title: 'Components/AssetInfo',
  component: AssetInfo,
  decorators: [getWrapperDecorator()],
  args: {
    item: ITEM,
    labels: ['Job #2', 'Job #1'],
    onClose: action('CLOSE'),
  },
} satisfies Meta<typeof AssetInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithChunks: Story = {
  args: {
    chunks: [
      {
        id: '1',
        name: 'vendor',
      },
      {
        id: '2',
        name: 'app~common~utils~shared',
      },
    ],
  },
};

export const WithFileType: Story = {
  args: {
    chunks: [
      {
        id: '1',
        name: 'vendor',
      },
      {
        id: '2',
        name: 'app~common~utils~shared',
      },
    ],
    item: {
      ...ITEM,
      fileType: 'JS',
    },
  },
};
