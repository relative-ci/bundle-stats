/* global module */
import React from 'react';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';

import { MetricsTable } from '.';

const runs = [
  {
    label: 'Run #1',
    data: {
      'webpack.totalSize': {
        value: 873421,
      },
      'lighthouse.time-to-first-byte': {
        value: 1231,
      },
      'lighthouse.score': {
        value: 80,
      },
      'webpack.totalSizeByType_js': {
        value: 344232,
      },
      'lighthouse.performance-score': {
        value: 80,
      },
    },
  },
  {
    label: 'Run #2',
    data: {
      'webpack.totalSize': {
        value: 122331,
        delta: -85.99,
        displayDelta: '-85.99%',
      },
      'lighthouse.time-to-first-byte': {
        value: 980,
        delta: -20.39,
        displayDelta: '-20.39%',
      },
      'lighthouse.score': {
        value: 70,
        delta: -12.5,
        displayDelta: '-12.5%',
      },
      'lighthouse.performance-score': {
        value: 80,
        delta: 0,
        displayDelta: '+0%',
      },
    },
  },
];

const rows = [
  {
    key: 'webpack.totalSize',
    changed: true,
    runs: [
      {
        value: 873421,
      },
      {
        value: 122331,
        delta: -85.99,
        displayDelta: '-85.99%',
      },
    ],
  },
  {
    key: 'lighthouse.time-to-first-byte',
    changed: true,
    runs: [
      {
        value: 1231,
      },
      {
        value: 980,
        delta: -20.39,
        displayDelta: '-20.39%',
      },
    ],
  },
  {
    key: 'lighthouse.score',
    changed: true,
    runs: [
      {
        value: 80,
      },
      {
        value: 70,
        delta: -12.5,
        displayDelta: '-12.5%',
      },
    ],
  },
  {
    key: 'webpack.totalSizeByType_js',
    changed: true,
    runs: [
      {
        value: 344232,
      },
      {
        delta: -100,
        displayDelta: '-100%',
      },
    ],
  },
  {
    key: 'lighthouse.performance-score',
    changed: false,
    runs: [
      {
        value: 80,
      },
      {
        value: 80,
        delta: 0,
        displayDelta: '+0%',
      },
    ],
  },
];

storiesOf('Components/MetricsTable', module).add('default', () => (
  <MetricsTable runs={runs} rows={rows} />
));
