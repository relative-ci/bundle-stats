import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { type MetricRunInfo, METRIC_TYPE_CONFIGS, getMetricRunInfo } from '@bundle-stats/utils';

import { getWrapperDecorator } from '../../../stories';
import { BASELINE_VALUE, CURRENT_VALUE_BY_DELTA_TYPE } from '../metrics-treemap.stories.utils';
import { TileGroupTitle } from '.';

const meta = {
  title: 'Components/MetricsTreemap/TileGroupTitle',
  component: TileGroupTitle,
  decorators: [
    // Outline the group area to visualize the title size
    (Story) => (
      <div style={{ width: 320, height: 48, outline: '1px dashed var(--color-outline)' }}>
        <Story />
      </div>
    ),
    getWrapperDecorator(),
  ],
  args: {
    id: 'src/components',
    title: 'components',
    runInfo: getMetricRunInfo(
      METRIC_TYPE_CONFIGS.METRIC_TYPE_FILE_SIZE,
      CURRENT_VALUE_BY_DELTA_TYPE.NEGATIVE,
      BASELINE_VALUE,
    ) as MetricRunInfo,
    fill: false,
  },
  argTypes: {
    fill: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof TileGroupTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * Run info
 */
export const NoBaseline: Story = {
  args: {
    runInfo: getMetricRunInfo(
      METRIC_TYPE_CONFIGS.METRIC_TYPE_FILE_SIZE,
      CURRENT_VALUE_BY_DELTA_TYPE.NEGATIVE,
    ) as MetricRunInfo,
  },
};

export const NoRunInfo: Story = {
  args: {
    runInfo: undefined,
  },
};

/**
 * Title
 */
export const NoTitle: Story = {
  args: {
    title: undefined,
    runInfo: undefined,
  },
};

/**
 * Fill
 */
export const Fill: Story = {
  args: {
    fill: true,
    runInfo: undefined,
  },
};

export const FillNoTitle: Story = {
  args: {
    fill: true,
    title: undefined,
    runInfo: undefined,
  },
};
