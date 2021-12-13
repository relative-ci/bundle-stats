import React from 'react';
import { storiesOf } from '@storybook/react';

import { getWrapperDecorator } from '../../stories';
import { BudgetInfo } from '.';

const stories = storiesOf('Components/BudgetInfo', module);
stories.addDecorator(getWrapperDecorator());

stories.add('default', () => (
  <BudgetInfo
    budget={{
      budget: 300,
      value: 250,
      overBudget: false,
    }}
    metric={{
      formatter: (v) => v,
    }}
  />
));

stories.add('over', () => (
  <BudgetInfo
    budget={{
      budget: 300,
      value: 350,
      overBudget: true,
    }}
    metric={{
      formatter: (v) => v,
    }}
  />
));
