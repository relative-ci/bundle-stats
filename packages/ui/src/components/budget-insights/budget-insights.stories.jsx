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
    type: 'SUCCESS',
    message: {
      text: '8 budget checks passed',
      md: '**8** budget checks passed',
    },
    data: {
      totalSizeByTypeALL: {
        type: 'ERROR',
        message: {
          text: 'Bundle Size is over the budget',
          md: 'Bundle Size is over the budget',
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
          text: 'Initial JS is over the budget',
          md: 'Initial JS is over the budget',
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
          text: 'Initial CSS is under the budget',
          md: 'Initial CSS is under the budget',
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
          text: 'Chunks is under the budget',
          md: 'Chunks is under the budget',
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
          text: 'Modules is under the budget',
          md: 'Modules is under the budget',
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
          text: 'Duplicate packages is over the budget',
          md: 'Duplicate packages is over the budget',
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
          text: 'JS is under the budget',
          md: 'JS is under the budget',
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
          text: 'CSS is under the budget',
          md: 'CSS is under the budget',
        },
        data: {
          currentValue: 56091,
          budgetValue: 20480,
          failed: true,
        },
      },
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
