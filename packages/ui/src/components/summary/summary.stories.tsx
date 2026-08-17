import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { createJobs } from '@bundle-stats/utils';

/* eslint-disable import/no-relative-packages */
import baselineData from '../../../../../fixtures/webpack-stats.baseline.json';
import currentData from '../../../../../fixtures/webpack-stats.current.json';
/* eslint-enable import/no-relative-packages */
import { getWrapperDecorator } from '../../stories';
import { Summary } from '.';

const MULTIPLE_JOBS = createJobs([{ webpack: currentData }, { webpack: baselineData }]);

const SINGLE_JOB = createJobs([{ webpack: currentData }]);

const meta = {
  title: 'Components/Summary',
  component: Summary,
  decorators: [getWrapperDecorator()],
} satisfies Meta<typeof Summary>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: MULTIPLE_JOBS[0].summary!.webpack,
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const SingleRun: Story = {
  args: {
    data: SINGLE_JOB[0].summary!.webpack,
    showSummaryItemDelta: false,
    showSummaryItemBaseline: false,
  },
};

export const WithLink: Story = {
  args: {
    data: MULTIPLE_JOBS[0].summary!.webpack,
    summaryItemLink: (linkProps) => (
      <button {...linkProps} type="button" onClick={() => alert(JSON.stringify(linkProps))} />
    ),
  },
};
