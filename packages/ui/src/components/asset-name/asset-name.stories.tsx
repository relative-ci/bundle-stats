import type { Meta, StoryObj } from '@storybook/react';

import { AssetName } from '.';

const ROW = {
  key: 'asset/main.js',
  label: 'asset/main.js',
  changed: true,
  isEntry: false,
  isChunk: false,
  isInitial: false,
  isAsset: true,
  isNotPredictive: false,
  fileType: 'JS',
  biggerIsBetter: false,
  runs: [
    { name: 'asset/main.abcd1234.js', value: 1024 * 10 },
    { name: 'asset/main.abcd1234.js', value: 1024 * 11 },
  ],
};

const meta = {
  title: 'Components/AssetName',
  component: AssetName,
  args: {
    customComponentLink: 'span',
    filters: {},
    search: '',
  },
} as Meta<typeof AssetName>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    row: ROW,
  },
};

export const MetaDefault: Story = {
  args: {
    row: {
      ...ROW,
      isEntry: true,
      isChunk: true,
      isInitial: true,
      isAsset: false,
    },
  },
};

export const MetaAdded: Story = {
  args: {
    row: {
      ...ROW,
      isEntry: 'added',
      isChunk: 'added',
      isInitial: 'added',
      isAsset: false,
    },
  },
};

export const MetaRemoved: Story = {
  args: {
    row: {
      ...ROW,
      isEntry: 'removed',
      isChunk: 'removed',
      isInitial: 'removed',
      isAsset: false,
    },
  },
};

export const NotPredictive: Story = {
  args: {
    row: {
      ...ROW,
      isNotPredictive: true,
    },
  },
};
