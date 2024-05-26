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
  showBaseline: false,
};

export const NoDelta = Template.bind({});

NoDelta.args = {
  ...NoBaseline.args,
  showDelta: false,
};

export const MetricNoDelta = Template.bind({});

MetricNoDelta.args = {
  metricId: 'webpack.cacheInvalidation',
  current: 85,
  baseline: 50,
};

export const CustomTitle = Template.bind({});

CustomTitle.args = {
  ...Default.args,
  titleWrapper: ({ children, style, ...restProps }: React.ComponentProps<'h1'>) => (
    <h1 style={{ ...style, fontStyle: 'italic' }} {...restProps}>
      {children}
    </h1>
  ),
};

export const CustomComponent = Template.bind({});

CustomComponent.args = {
  ...Default.args,
  as: 'a',
  href: 'https://google.com/search?query=bundle+stats',
};
