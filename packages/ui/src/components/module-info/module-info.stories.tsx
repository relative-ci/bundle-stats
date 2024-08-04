import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { action } from '@storybook/addon-actions';

import { getWrapperDecorator } from '../../stories';
import { ModuleInfo } from '.';

export default {
  title: 'Components/ModuleInfo',
  component: ModuleInfo,
  decorators: [getWrapperDecorator()],
};

export const Default = () => (
  <ModuleInfo
    item={{
      label: './node_modules/lodash/fp/merge.js',
      duplicated: true,
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
    }}
    chunks={[
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
    ]}
    chunkIds={['1', '2', '3']}
    labels={['Job #2', 'Job #1']}
    onClose={action('CLOSE')}
  />
);

export const Duplicates = () => (
  <ModuleInfo
    item={{
      label: './node_modules/lodash/fp/merge.js',
      duplicated: true,
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
    }}
    chunks={[
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
    ]}
    chunkIds={['1', '2', '3', '4', '5']}
    labels={['Job #2', 'Job #1']}
    onClose={action('CLOSE')}
  />
);
