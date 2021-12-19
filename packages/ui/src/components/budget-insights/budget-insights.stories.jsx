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
      currentValue: 2097917,
      budgetValue: 2097152,
      failed: true,
    },
    totalInitialSizeJS: {
      currentValue: 1265645,
      budgetValue: 524288,
      failed: true,
    },
    totalInitialSizeCSS: {
      currentValue: 48866,
      budgetValue: 51200,
      failed: false,
    },
    chunkCount: {
      currentValue: 12,
      budgetValue: 50,
      failed: false,
    },
    moduleCount: {
      currentValue: 1059,
      budgetValue: 2000,
      failed: false,
    },
    duplicatePackagesCount: {
      currentValue: 13,
      budgetValue: 5,
      failed: true,
    },
    'sizes.totalSizeByTypeJS': {
      currentValue: 1981470,
      budgetValue: 2097152,
      failed: false,
    },
    'sizes.totalSizeByTypeCSS': {
      currentValue: 56091,
      budgetValue: 20480,
      failed: true,
    },
  },
};

export const FailedBudgets = Template.bind();

FailedBudgets.args = {
  source: 'webpack',
  budgets: {
    totalSizeByTypeALL: {
      currentValue: 2097917,
      budgetValue: 2097152,
      failed: true,
    },
    totalInitialSizeJS: {
      currentValue: 1265645,
      budgetValue: 524288,
      failed: true,
    },
  },
};

export const SingleBudget = Template.bind();

SingleBudget.args = {
  source: 'webpack',
  budgets: {
    totalInitialSizeJS: {
      currentValue: 524288,
      budgetValue: 1265645,
      failed: false,
    },
  },
};
