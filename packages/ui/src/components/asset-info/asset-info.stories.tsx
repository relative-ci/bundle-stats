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
      label: 'static/vendor.js',
      changed: true,
      isChunk: true,
      isEntry: true,
      isInitial: true,
      isNotPredicative: false,
      runs: [
        {
          name: 'static/vendor.abcd1234.js',
          displayValue: '959.66KiB',
          displayDeltaPercentage: '-3.9%',
          deltaType: 'LOW_POSITIVE',
        },
        {
          name: 'static/vendor.defg5678.js',
          displayValue: '998.56KiB',
        },
      ],
    }}
    labels={['Job #2', 'Job #1']}
  />
);

export const WithChunks = () => (
  <AssetInfo
    item={{
      label: 'static/vendor.js',
      changed: true,
      isChunk: true,
      isEntry: false,
      isInitial: true,
      isNotPredicative: false,
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
