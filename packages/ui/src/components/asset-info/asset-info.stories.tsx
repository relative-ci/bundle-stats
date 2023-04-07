import React from 'react';

import { getWrapperDecorator } from '../../stories';
import { AssetInfo } from '.';

export default {
  title: 'Components/AssetInfo',
  component: AssetInfo,
  decorators: [getWrapperDecorator()],
};

const RUNS = [
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
];

export const Default = () => (
  <AssetInfo
    item={{
      label: 'static/vendor.js',
      changed: true,
      isChunk: true,
      isEntry: true,
      isInitial: true,
      isNotPredicative: false,
      runs: RUNS,
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
      isEntry: true,
      isInitial: true,
      isNotPredicative: false,
      runs: RUNS,
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
