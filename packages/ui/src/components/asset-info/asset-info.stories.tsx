import React from 'react';

import { getWrapperDecorator } from '../../stories';
import { AssetInfo } from '.';

export default {
  title: 'Components/AssetInfo',
  component: AssetInfo,
  decorators: [getWrapperDecorator()],
};

export const Default = () => (
  <AssetInfo
    item={{
      runs: [
        {
          name: 'static/vendor.abcd1234.js',
        },
        {
          name: 'static/vendor.defg5678.js',
        },
      ],
    }}
    labels={['Job #2', 'Job #1']}
  />
);

export const WithChunks = () => (
  <AssetInfo
    item={{
      runs: [
        {
          name: 'static/vendor.abcd1234.js',
          chunkId: '1',
        },
        {
          name: 'static/vendor.defg5678.js',
          chunkId: '2',
        },
      ],
    }}
    chunks={[
      {
        id: '1',
        name: 'vendor',
      },
      {
        id: '2',
        name: 'app~common~utils~shared',
      },
    ]}
    labels={['Job #2', 'Job #1']}
  />
);
