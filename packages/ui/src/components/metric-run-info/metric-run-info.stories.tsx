import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { MetricRunInfo } from '.';

const meta = {
  title: 'Components/MetricRunInfo',
  component: MetricRunInfo,
} satisfies Meta<typeof MetricRunInfo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    metricId: 'webpack.totalSizeByTypeALL',
    current: 120 * 1024,
    baseline: 100 * 1024,
  },
};

export const NoBaseline: Story = {
  args: {
    metricId: 'webpack.totalSizeByTypeALL',
    current: 120 * 1024,
    showBaseline: false,
  },
};

export const NoDelta: Story = {
  args: {
    ...NoBaseline.args,
    showDelta: false,
  },
};

export const MetricNoDelta: Story = {
  args: {
    metricId: 'webpack.cacheInvalidation',
    current: 85,
    baseline: 50,
  },
};

export const CustomTitle: Story = {
  args: {
    ...Default.args,
    titleWrapper: ({ children, style, ...restProps }) => (
      <h1 style={{ ...style, fontStyle: 'italic' }} {...restProps}>
        {children}
      </h1>
    ),
  },
};

export const CustomComponent: Story = {
  // MetricRunInfoProps only types its passthrough props as ComponentProps<'div'>,
  // but they're forwarded to RunInfo, which supports polymorphic `as` at runtime.
  args: {
    ...Default.args,
    as: 'a',
    href: 'https://google.com/search?query=bundle+stats',
  } as unknown as Story['args'],
};
