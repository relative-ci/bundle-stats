import React from 'react';

import { getWrapperDecorator } from '../../stories';
import { PackageInfo } from '.';

export default {
  title: 'Components/PackageInfo',
  component: PackageInfo,
  decorators: [getWrapperDecorator()],
};

const RUNS = [
  {
    name: 'lodash',
    value: 279901,
    path: '../node_modules/lodash',
  },
  {
    name: 'lodash',
    value: 283712,
    displayValue: '277.06KiB',
    path: '../node_modules/lodash',
  },
];

export const Default = () => (
  <PackageInfo
    name="lodash~1"
    item={{
      label: 'lodash',
      duplicate: false,
      runs: RUNS as any,
    }}
    labels={['Job #2', 'Job #1']}
  />
);
