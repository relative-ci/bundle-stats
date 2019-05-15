import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { generateRows } from '../../hocs/with-metrics';
import { MetricsTable } from '.';

const RUNS = [
  {
    label: 'Run #1',
    data: {
      'webpack.assets.totalSizeByTypeALL': {
        value: 873421,
      },
      'lighthouse.timeToFirstByte': {
        value: 1231,
      },
      'lighthouse.score': {
        value: 80,
      },
      'webpack.assets.totalSizeByTypeJS': {
        value: 344232,
      },
      'lighthouse.domSize': {
        value: 80,
      },
    },
  },
  {
    label: 'Run #2',
    data: {
      'webpack.assets.totalSizeByTypeALL': {
        value: 122331,
      },
      'lighthouse.timeToFirstByte': {
        value: 980,
      },
      'lighthouse.score': {
        value: 70,
      },
      'lighthouse.domSize': {
        value: 80,
      },
    },
  },
];

const stories = storiesOf('Components/MetricsTable', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <MetricsTable runs={RUNS.slice(0, 1)} rows={generateRows(RUNS.slice(0, 1))} />
));

stories.add('multiple runs', () => (
  <MetricsTable runs={RUNS} rows={generateRows(RUNS)} />
));

const RUNS_WITH_EMPTY_BASELINE = [
  RUNS[0],
  {
    ...RUNS[1],
    data: {},
  },
];

stories.add('empty baseline', () => (
  <MetricsTable
    runs={RUNS_WITH_EMPTY_BASELINE}
    rows={generateRows(RUNS_WITH_EMPTY_BASELINE)}
  />
));
