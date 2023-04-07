import React from 'react';

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
          chunkIds: ['1', '2'],
          value: 1024 * 4,
        },
        {
          name: './node_modules/lodash/fp/merge.js',
          chunkIds: ['1', '2'],
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
    ]}
    chunkIds={['1', '2']}
    labels={['Job #2', 'Job #1']}
  />
);
