import React from 'react';
import { Meta, Story } from '@storybook/react';
import { createJobs } from '@bundle-stats/utils';

import baselineData from '../../../__mocks__/webpack-stats.baseline.json';
import currentData from '../../../__mocks__/webpack-stats.current.json';
import { METRICS_WEBPACK_ASSETS } from '../../constants';
import { getWrapperDecorator } from '../../stories';
import { Summary } from '.';

const MULTIPLE_JOBS = createJobs([{ webpack: currentData }, { webpack: baselineData }]);

const SINGLE_JOB = createJobs([{ webpack: currentData }]);

export default {
  title: 'Components/Summary',
  component: Summary,
  decorators: [getWrapperDecorator()],
} as Meta;

const Template: Story = (args) => <Summary {...args} />;

export const Default = Template.bind({});

Default.args = {
  data: MULTIPLE_JOBS[0].summary,
};

export const CustomKeys = Template.bind({});

CustomKeys.args = {
  keys: METRICS_WEBPACK_ASSETS,
  data: MULTIPLE_JOBS[0].summary,
};

export const Loading = Template.bind({});

Loading.args = {
  loading: true,
};

export const SingleRun = Template.bind({});

SingleRun.args = {
  data: SINGLE_JOB[0].summary,
  showSummaryItemDelta: false,
};

export const WithLink = Template.bind({});

WithLink.args = {
  data: MULTIPLE_JOBS[0].summary,
  summaryItemLink: (linkProps: React.ComponentProps<'button'>) => (
    <button {...linkProps} type="button" onClick={() => alert(JSON.stringify(linkProps))} />
  ),
};
