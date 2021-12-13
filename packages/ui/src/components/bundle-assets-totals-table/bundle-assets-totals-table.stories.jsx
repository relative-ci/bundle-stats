import React from 'react';
import { createJobs } from '@bundle-stats/utils';

import baselineStats from '../../../__mocks__/webpack-stats.baseline.json';
import currentStats from '../../../__mocks__/webpack-stats.current.json';
import { getWrapperDecorator } from '../../stories';
import { BundleAssetsTotalsTable } from '.';

export default {
  title: 'Components/BundleAssetsTotalsTable',
  component: BundleAssetsTotalsTable,
  decorators: [getWrapperDecorator()],
};

const Template = (args) => <BundleAssetsTotalsTable {...args} />;

export const SingleJob = Template.bind();

SingleJob.args = {
  jobs: createJobs([{ webpack: currentStats }]),
};

export const MultipleJobs = Template.bind();

MultipleJobs.args = {
  jobs: createJobs([{ webpack: currentStats }, { webpack: baselineStats }]),
};

export const EmptyBaseline = Template.bind();

EmptyBaseline.args = {
  jobs: createJobs([{ webpack: currentStats }, null]),
};

export const WithBudgets = Template.bind();

WithBudgets.args = {
  jobs: createJobs([{ webpack: currentStats }, { webpack: baselineStats }], {
    webpack: {
      budgets: [
        {
          metric: 'sizes.totalSizeByTypeJS',
          value: 2 * 1024 * 1024,
        },
        {
          metric: 'sizes.totalSizeByTypeCSS',
          value: 20 * 1024,
        },
      ],
    },
  }),
};
