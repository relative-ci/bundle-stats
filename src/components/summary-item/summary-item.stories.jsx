import React from 'react';
import { storiesOf } from '@storybook/react';

import { SummaryItem } from './summary-item';

const stories = storiesOf('SummaryItem', module);

stories.addDecorator(storyFn => (
  <div style={{ maxWidth: '240px', width: '100%' }}>
    {storyFn()}
  </div>
));

stories.add('default', () => (
  <SummaryItem
    loading={false}
    id="webpack.assets.totalSizeByTypeALL"
    data={{
      'webpack.assets.totalSizeByTypeALL': {
        current: 120 * 1000,
        baseline: 100 * 1000,
      },
    }}
  />
));

stories.add('loading', () => (
  <SummaryItem
    loading
    id="webpack.assets.totalSizeByTypeALL"
  />
));
