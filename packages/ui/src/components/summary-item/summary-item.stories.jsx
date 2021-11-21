import React from 'react';

import { SummaryItem } from './summary-item';

export default {
  title: 'Components/SummaryItem',
  component: SummaryItem,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '320px' }}>
        <Story />
      </div>
    ),
  ],
  args: {
    loading: false,
    id: 'webpack.totalSizeByTypeALL',
    data: {
      current: 120 * 1000,
      baseline: 100 * 1000,
    },
  },
};

const Template = (args) => <SummaryItem {...args} />;

export const Standard = Template.bind();

export const SizeLarge = Template.bind();

SizeLarge.args = {
  size: 'large',
};

export const ShowMetricDescription = Template.bind();

ShowMetricDescription.args = {
  showMetricDescription: true,
};

export const ShowDeltaFalse = Template.bind();

ShowDeltaFalse.args = {
  showDelta: false,
};

export const BudgetOver = Template.bind();

BudgetOver.args = {
  showMetricDescription: true,
  budget: {
    value: 120 * 1000,
    budget: 100 * 1000,
    overBudget: true,
  },
};

export const BudgetUnder = Template.bind();

BudgetUnder.args = {
  showMetricDescription: true,
  budget: {
    value: 120 * 1000,
    budget: 120 * 1024,
    overBudget: false,
  },
};

export const Loading = Template.bind();

Loading.args = {
  loading: true,
};
