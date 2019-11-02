import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { SummaryItem } from './summary-item';

const stories = storiesOf('Components/SummaryItem', module);
stories.addDecorator(getWrapperDecorator({ maxWidth: '320px' }));

stories.add('default', () => (
  <SummaryItem
    loading={false}
    id="webpack.assets.totalSizeByTypeALL"
    data={{
      current: 120 * 1000,
      baseline: 100 * 1000,
    }}
  />
));

stories.add('size large', () => (
  <SummaryItem
    size="large"
    loading={false}
    id="webpack.assets.totalSizeByTypeALL"
    data={{
      current: 120 * 1000,
      baseline: 100 * 1000,
    }}
  />
));

stories.add('showMetricDescription', () => (
  <SummaryItem
    loading={false}
    id="webpack.assets.totalSizeByTypeALL"
    data={{
      current: 120 * 1000,
      baseline: 100 * 1000,
    }}
    showMetricDescription
  />
));

stories.add('showDelta false', () => (
  <SummaryItem
    loading={false}
    id="webpack.assets.totalSizeByTypeALL"
    data={{
      current: 120 * 1000,
      baseline: 0,
    }}
    showDelta={false}
  />
));

stories.add('loading', () => (
  <SummaryItem
    loading
    id="webpack.assets.totalSizeByTypeALL"
  />
));
