import React from 'react';
import { action } from 'storybook/actions'; // eslint-disable-line import/no-extraneous-dependencies

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
    onClose={action('CLOSE')}
  />
);

export const Added = () => (
  <EntryInfo
    item={{
      label: 'static/vendor.js',
      runs: [RUNS[0], null] as any,
    }}
    labels={['Job #2', 'Job #1']}
    onClose={action('CLOSE')}
  />
);

export const Removed = () => (
  <EntryInfo
    item={{
      label: 'static/vendor.js',
      runs: [null, RUNS[1]] as any,
    }}
    labels={['Job #2', 'Job #1']}
    onClose={action('CLOSE')}
  />
);

export const WithCustomContent = () => (
  <EntryInfo
    item={{
      label: 'static/vendor.js',
      runs: RUNS as any,
    }}
    labels={['Job #2', 'Job #1']}
    tags={<span>Critical tags</span>}
    onClose={action('CLOSE')}
  >
    <div>
      <EntryInfo.Meta label="Meta 1">value 1</EntryInfo.Meta>
      <EntryInfo.Meta label="Meta 2">value 2</EntryInfo.Meta>
    </div>
    <div>custom entry info 1</div>
    <div>custom entry info 2</div>
  </EntryInfo>
);
