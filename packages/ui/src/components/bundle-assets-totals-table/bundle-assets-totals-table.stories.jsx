import React from 'react';
import { createJobs } from '@bundle-stats/utils';

/* eslint-disable import/no-relative-packages */
import baselineStats from '../../../../../fixtures/webpack-stats.baseline.json';
import currentStats from '../../../../../fixtures/webpack-stats.current.json';
/* eslint-enable import/no-relative-packages */
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
  jobs: createJobs([{ webpack: currentStats }, {}]),
};
