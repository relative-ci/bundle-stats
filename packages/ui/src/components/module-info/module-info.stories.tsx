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
      label: './node_modules/lodash/fp/_baseConvert.js',
      runs: [
        {
          key: './node_modules/lodash/fp/_baseConvert.js',
          name: './node_modules/lodash/fp/_baseConvert.js',
          chunkIds: ['2'],
        },
        {
          key: './node_modules/lodash/fp/_baseConvert.js',
          name: './node_modules/lodash/fp/_baseConvert.js',
          chunkIds: ['2'],
        },
      ],
    }}
    chunks={[
      {
        id: '2',
        name: 'vendors',
      },
    ]}
    chunkIds={['1', '2']}
    labels={['Job #2', 'Job #1']}
  />
);
