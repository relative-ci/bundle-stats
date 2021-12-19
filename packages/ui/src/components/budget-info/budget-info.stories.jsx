import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { BudgetInfo } from '.';

const stories = storiesOf('Components/BudgetInfo', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <BudgetInfo
    metricId="webpack.assetCount"
    budgetInsight={{
      budgetValue: 300,
      currentValue: 250,
      failed: false,
    }}
  />
));

stories.add('error', () => (
  <BudgetInfo
    metricId="webpack.assetCount"
    budgetInsight={{
      budgetValue: 300,
      currentValue: 350,
      failed: true,
    }}
  />
));

stories.add('warning', () => (
  <BudgetInfo
    metricId="webpack.assetCount"
    budgetInsight={{
      budgetValue: 300,
      currentValue: 300,
      failed: false,
    }}
  />
));
