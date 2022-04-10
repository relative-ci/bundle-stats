import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { merge } from 'lodash';

import { BudgetInsights } from '.';

const BUDGETS = {
  type: 'SUCCESS',
  message: {
    text: '8 budget checks passed',
    md: '**8** budget checks passed',
  },
  data: {
    totalSizeByTypeALL: {
      type: 'ERROR',
      message: {
        text: 'Bundle Size is above the budget',
        md: 'Bundle Size is above the budget',
      },
      data: {
        currentValue: 2097917,
        budgetValue: 2097152,
        failed: true,
      },
    },
    totalInitialSizeJS: {
      type: 'ERROR',
      message: {
        text: 'Initial JS is above the budget',
        md: 'Initial JS is above the budget',
      },
      data: {
        currentValue: 1265645,
        budgetValue: 524288,
        failed: true,
      },
    },
    totalInitialSizeCSS: {
      type: 'SUCCESS',
      message: {
        text: 'Initial CSS is below the budget',
        md: 'Initial CSS is below the budget',
      },
      data: {
        currentValue: 48866,
        budgetValue: 51200,
        failed: false,
      },
    },
    chunkCount: {
      type: 'SUCCESS',
      message: {
        text: 'Chunks is below the budget',
        md: 'Chunks is below the budget',
      },
      data: {
        currentValue: 12,
        budgetValue: 50,
        failed: false,
      },
    },
    moduleCount: {
      type: 'SUCCESS',
      message: {
        text: 'Modules is below the budget',
        md: 'Modules is below the budget',
      },
      data: {
        currentValue: 1059,
        budgetValue: 2000,
        failed: false,
      },
    },
    duplicatePackagesCount: {
      type: 'ERROR',
      message: {
        text: 'Duplicate packages is above the budget',
        md: 'Duplicate packages is above the budget',
      },
      data: {
        currentValue: 13,
        budgetValue: 5,
        failed: true,
      },
    },
    'sizes.totalSizeByTypeJS': {
      type: 'SUCCESS',
      message: {
        text: 'JS is below the budget',
        md: 'JS is below the budget',
      },
      data: {
        currentValue: 1981470,
        budgetValue: 2097152,
        failed: false,
      },
    },
    'sizes.totalSizeByTypeCSS': {
      type: 'SUCCESS',
      message: {
        text: 'CSS is below the budget',
        md: 'CSS is below the budget',
      },
      data: {
        currentValue: 56091,
        budgetValue: 20480,
        failed: true,
      },
    },
  },
};

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
  budgets: BUDGETS,
};

export const FailedBudgets = Template.bind();

FailedBudgets.args = {
  source: 'webpack',
  budgets: merge({}, BUDGETS, {
    type: 'ERROR',
    message: {
      text: '2/8 budget checks failed',
      md: '**2/8** budget checks failed',
    },
  }),
};

export const WarnedBudgets = Template.bind();

WarnedBudgets.args = {
  source: 'webpack',
  budgets: merge({}, BUDGETS, {
    type: 'WARNING',
    message: {
      text: '2/8 budget checks warned',
      md: '**2/8** budget checks warned',
    },
  }),
};
