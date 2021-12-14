import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { BudgetInsights } from '.';

export default {
  title: 'Components/BudgetInsights',
  component: BudgetInsights,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

const Template = (args) => <BudgetInsights {...args} />;

export const Default = Template.bind();

Default.args = {
  source: 'webpack',
  budgets: {
    totalSizeByTypeALL: {
      value: 2097917,
      budget: 2097152,
      overBudget: true,
    },
    totalInitialSizeJS: {
      value: 1265645,
      budget: 524288,
      overBudget: true,
    },
    totalInitialSizeCSS: {
      value: 48866,
      budget: 51200,
      overBudget: false,
    },
    chunkCount: {
      value: 12,
      budget: 50,
      overBudget: false,
    },
    moduleCount: {
      value: 1059,
      budget: 2000,
      overBudget: false,
    },
    duplicatePackagesCount: {
      value: 13,
      budget: 5,
      overBudget: true,
    },
    'sizes.totalSizeByTypeJS': {
      value: 1981470,
      budget: 2097152,
      overBudget: false,
    },
    'sizes.totalSizeByTypeCSS': {
      value: 56091,
      budget: 20480,
      overBudget: true,
    },
  },
};

export const FailedBudgets = Template.bind();

FailedBudgets.args = {
  source: 'webpack',
  budgets: {
    totalSizeByTypeALL: {
      value: 2097917,
      budget: 2097152,
      overBudget: true,
    },
    totalInitialSizeJS: {
      value: 1265645,
      budget: 524288,
      overBudget: true,
    },
  },
};

export const SingleBudget = Template.bind();

SingleBudget.args = {
  source: 'webpack',
  budgets: {
    totalInitialSizeJS: {
      value: 524288,
      budget: 1265645,
      overBudget: false,
    },
  },
};
