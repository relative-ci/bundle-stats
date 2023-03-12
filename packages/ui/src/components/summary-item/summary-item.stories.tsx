import React from 'react';
import { Meta, Story } from '@storybook/react';

import { SummaryItem } from './summary-item';

export default {
  title: 'Components/SummaryItem',
  component: SummaryItem,
} as Meta;

const Template: Story = (args) => <SummaryItem id="webpack.totalSizeByTypeALL" {...args} />;

export const Default = Template.bind({});

Default.args = {
  data: {
    current: 120 * 1000,
    baseline: 100 * 1000,
  },
};

export const SizeLarge = Template.bind({});

SizeLarge.args = {
  data: {
    current: 120 * 1000,
    baseline: 100 * 1000,
  },
  size: 'large',
};

export const ShowMetricDescription = Template.bind({});

ShowMetricDescription.args = {
  data: {
    current: 120 * 1000,
    baseline: 100 * 1000,
  },
  showMetricDescription: true,
};

export const ShowDeltaFalse = Template.bind({});

ShowDeltaFalse.args = {
  data: {
    current: 120 * 1000,
    baseline: 0,
  },
  showDelta: false,
};

export const Loading = Template.bind({});

Loading.args = {
  loading: true,
};
