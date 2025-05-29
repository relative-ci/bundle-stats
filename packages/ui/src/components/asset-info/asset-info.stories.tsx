import React from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from 'storybook/actions'; // eslint-disable-line import/no-extraneous-dependencies

import { getWrapperDecorator } from '../../stories';
import { AssetInfo } from '.';

export default {
  title: 'Components/AssetInfo',
  component: AssetInfo,
  decorators: [getWrapperDecorator()],
} as Meta;

const ITEM = {
  label: 'static/vendor.js',
  changed: true,
  isChunk: true,
  isEntry: true,
  isInitial: true,
  isNotPredictive: false,
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

const Template = (props: Pick<React.ComponentProps<typeof AssetInfo>, 'chunks'>) => (
  <AssetInfo item={ITEM} labels={['Job #2', 'Job #1']} onClose={action('CLOSE')} {...props} />
);

export const Default: Story = Template.bind({});

export const WithChunks: Story = Template.bind({});

WithChunks.args = {
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
};

export const WithFileType: Story = Template.bind({});

WithFileType.args = {
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
};
