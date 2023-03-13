import React from 'react';

import { Meta, Story } from '@storybook/react';
import { MetricRunInfo } from '.';

export default {
  title: 'Components/MetricRunInfo',
  component: MetricRunInfo,
} as Meta;

const Template: Story = (args: any) => <MetricRunInfo {...args} />;

export const Default = Template.bind({});

Default.args = {
  metricId: 'webpack.totalSizeByTypeALL',
  current: 120 * 1024,
  baseline: 100 * 1024,
};

export const NoBaseline = Template.bind({});

NoBaseline.args = {
  metricId: 'webpack.totalSizeByTypeALL',
  current: 120 * 1024,
};

export const NoDelta = Template.bind({});

NoDelta.args = {
  ...Default.args,
  showDelta: false,
};
