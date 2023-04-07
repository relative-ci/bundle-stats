import React from 'react';

import { getWrapperDecorator } from '../../stories';
import { EntryInfo } from '.';

export default {
  title: 'Components/EntryInfo',
  component: EntryInfo,
  decorators: [getWrapperDecorator()],
};

const RUNS = [
  {
    name: 'static/vendor.abcd1234.js',
    value: 982690,
  },
  {
    name: 'static/vendor.defg5678.js',
    value: 1022530,
    displayValue: '998.56KiB',
  },
];

export const Default = () => (
  <EntryInfo
    item={{
      label: 'static/vendor.js',
      runs: RUNS as any,
    }}
    labels={['Job #2', 'Job #1']}
  />
);

export const Added = () => (
  <EntryInfo
    item={{
      label: 'static/vendor.js',
      runs: [RUNS[0], null],
    }}
    labels={['Job #2', 'Job #1']}
  />
);

export const Removed = () => (
  <EntryInfo
    item={{
      label: 'static/vendor.js',
      runs: [null, RUNS[1]],
    }}
    labels={['Job #2', 'Job #1']}
  />
);

export const WithCustomContent = () => (
  <EntryInfo
    item={{
      label: 'static/vendor.js',
      runs: RUNS as any,
    }}
    labels={['Job #2', 'Job #1']}
  >
    <div>
      Custom entry info
    </div>
  </EntryInfo>
);
