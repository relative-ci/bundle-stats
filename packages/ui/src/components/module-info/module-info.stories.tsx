import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { getWrapperDecorator } from '../../stories';
import { ModuleInfo } from '.';

const ITEM = {
  key: './node_modules/lodash/fp/merge.js',
  label: './node_modules/lodash/fp/merge.js',
  biggerIsBetter: false,
  changed: true,
  thirdParty: true,
  duplicated: true,
  fileType: 'JS',
};

const meta = {
  title: 'Components/ModuleInfo',
  component: ModuleInfo,
  decorators: [getWrapperDecorator()],
  args: {
    labels: ['Job #2', 'Job #1'],
    onClose: action('CLOSE'),
  },
} satisfies Meta<typeof ModuleInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    item: {
      ...ITEM,
      runs: [
        {
          name: './node_modules/lodash/fp/merge.js',
          chunkIds: ['1'],
          value: 1024 * 4,
        },
        {
          name: './node_modules/lodash/fp/merge.js',
          chunkIds: ['1'],
          value: 1024 * 3,
          displayValue: '3KiB',
        },
      ] as any,
    },
    chunks: [
      {
        id: '1',
        name: 'chunk-1',
      },
      {
        id: '2',
        name: 'chunk-2',
      },
      {
        id: '3',
        name: 'chunk-3',
      },
    ],
    chunkIds: ['1', '2', '3'],
  },
};

export const Duplicates: Story = {
  args: {
    item: {
      ...ITEM,
      runs: [
        {
          name: './node_modules/lodash/fp/merge.js',
          chunkIds: ['1', '2', '3', '5'],
          value: 1024 * 4,
        },
        {
          name: './node_modules/lodash/fp/merge.js',
          chunkIds: ['1', '2', '4'],
          value: 1024 * 3,
          displayValue: '3KiB',
        },
      ] as any,
    },
    chunks: [
      {
        id: '1',
        name: 'chunk-1',
      },
      {
        id: '2',
        name: 'chunk-2',
      },
      {
        id: '3',
        name: 'chunk-3',
      },
      {
        id: '4',
        name: 'chunk-4',
      },
      {
        id: '5',
        name: 'chunk-5',
      },
    ],
    chunkIds: ['1', '2', '3', '4', '5'],
  },
};
