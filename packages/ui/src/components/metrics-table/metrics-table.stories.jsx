import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { MetricsTable } from '.';

const RUNS = [
  {
    internalBuildNumber: 2,
    label: 'Job #2',
  },
  {
    internalBuildNumber: 1,
    label: <a href="#noop">Job #1</a>,
  },
];

const ITEMS_SINGLE_RUN = [
  {
    key: 'webpack.assets.totalSizeByTypeALL',
    label: 'Total Size',
    biggerIsBetter: false,
    changed: false,
    runs: [
      {
        value: 873421,
        displayValue: '852.95KB',
      },
    ],
  },
  {
    key: 'lighthouse.timeToFirstByte',
    label: 'Time To First Byte',
    biggerIsBetter: false,
    changed: false,
    runs: [
      {
        value: 1231,
        displayValue: '1.231s',
      },
    ],
  },
  {
    key: 'lighthouse.score',
    label: 'Score',
    biggerIsBetter: true,
    changed: false,
    runs: [
      {
        value: 80,
        displayValue: '80',
      },
    ],
  },
  {
    key: 'webpack.assets.totalSizeByTypeJS',
    label: 'JS',
    biggerIsBetter: false,
    changed: false,
    runs: [
      {
        value: 344232,
        displayValue: '336.16KB',
      },
    ],
  },
  {
    key: 'lighthouse.domSize',
    label: 'DOM Size',
    biggerIsBetter: false,
    changed: false,
    runs: [
      {
        value: 80,
        displayValue: '80',
      },
    ],
  },
];

const ITEMS_MULTIPLE_RUNS = [
  {
    key: 'webpack.assets.totalSizeByTypeALL',
    label: 'Total Size',
    biggerIsBetter: false,
    changed: true,
    runs: [
      {
        value: 873421,
        displayValue: '852.95KB',
        delta: 751090,
        displayDelta: '+700KB',
        deltaPercentage: 613.98,
        displayDeltaPercentage: '+613.98%',
        deltaType: 'HIGH_NEGATIVE',
      },
      {
        value: 122331,
        displayValue: '119.46KB',
      },
    ],
  },
  {
    key: 'lighthouse.timeToFirstByte',
    label: 'Time To First Byte',
    biggerIsBetter: false,
    changed: true,
    runs: [
      {
        value: 1000,
        displayValue: '1s',
        delta: 20,
        displayDelta: '+20ms',
        deltaPercentage: 2.0408163,
        displayDeltaPercentage: '+2.04%',
        deltaType: 'LOW_NEGATIVE',
      },
      {
        value: 980,
        displayValue: '980ms',
      },
    ],
  },
  {
    key: 'lighthouse.score',
    label: 'Score',
    biggerIsBetter: true,
    changed: true,
    runs: [
      {
        value: 80,
        displayValue: '80',
        delta: 10,
        displayDelta: '+10',
        deltaPercentage: 14.2857143,
        displayDeltaPercentage: '+14.29%',
        deltaType: 'POSITIVE',
      },
      {
        value: 70,
        displayValue: '70',
      },
    ],
  },
  {
    key: 'lighthouse.accessibilityScore',
    label: 'Accessibility score',
    biggerIsBetter: true,
    changed: true,
    runs: [
      {
        value: 80,
        displayValue: '80',
        delta: 2,
        displayDelta: '+2',
        deltaPercentage: 2.5641026,
        displayDeltaPercentage: '+2.56%',
        deltaType: 'LOW_POSITIVE',
      },
      {
        value: 78,
        displayValue: '78',
      },
    ],
  },
  {
    key: 'webpack.assets.totalSizeByTypeJS',
    label: 'JS',
    biggerIsBetter: false,
    changed: true,
    runs: [
      {
        value: 344232,
        displayValue: '336.16KB',
        delta: 344232,
        displayDelta: '+100%',
        deltaPercentage: 100,
        displayDeltaPercentage: '+100%',
        deltaType: 'HIGH_NEGATIVE',
      },
      null,
    ],
  },
  {
    key: 'lighthouse.domSize',
    label: 'DOM Size',
    biggerIsBetter: false,
    changed: false,
    runs: [
      {
        value: 80,
        displayValue: '80',
        delta: 0,
        displayDelta: '0',
        deltaPercentage: 0,
        displayDeltaPercentage: '0%',
        deltaType: 'NO_CHANGE',
      },
      {
        value: 80,
        displayValue: '80',
      },
    ],
  },
];

const stories = storiesOf('Components/MetricsTable', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <MetricsTable runs={RUNS.slice(0, 1)} items={ITEMS_SINGLE_RUN} />
));

stories.add('multiple runs', () => (
  <MetricsTable runs={RUNS} items={ITEMS_MULTIPLE_RUNS} />
));

stories.add('with header rows', () => (
  <MetricsTable
    runs={RUNS}
    items={ITEMS_MULTIPLE_RUNS}
    headerRows={[
      [
        'Metric',
        {
          children: 'Colspan',
          colSpan: 1 + (RUNS.length - 1) * 2 + 1,
          style: {
            textAlign: 'center'
          }
        }
      ]
    ]}
  />
));

stories.add('empty', () =><MetricsTable runs={RUNS} items={[]} />);
