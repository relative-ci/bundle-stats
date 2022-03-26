import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { BudgetInfo } from '.';

const stories = storiesOf('Components/BudgetInfo', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <BudgetInfo
    budgetInsight={{
      type: 'SUCCESS',
      message: {
        text: 'Metric is under the budget',
      },
      data: {
        budgetValue: 300,
        currentValue: 250,
        failed: false,
      },
    }}
  />
));

stories.add('error', () => (
  <BudgetInfo
    budgetInsight={{
      type: 'ERROR',
      message: {
        text: 'Metric is over the budget',
      },
      data: {
        budgetValue: 300,
        currentValue: 250,
        failed: false,
      },
    }}
  />
));

stories.add('warning', () => (
  <BudgetInfo
    budgetInsight={{
      type: 'WARNING',
      message: {
        text: 'Metric is equal the budget',
      },
      data: {
        budgetValue: 300,
        currentValue: 250,
        failed: false,
      },
    }}
  />
));
