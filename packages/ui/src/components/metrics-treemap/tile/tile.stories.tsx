import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import { getWrapperDecorator } from '../../../stories';
import { type TreeLeaf, PADDING_INNER } from '../metrics-treemap.constants';
import {
  CURRENT_VALUE_BY_DELTA_TYPE,
  createReportMetricRow,
} from '../metrics-treemap.stories.utils';
import { Tile } from '.';

function createTreeLeaf(current: number): TreeLeaf {
  const item = createReportMetricRow('src/components/button/button.tsx', current);

  return {
    id: item.key,
    label: 'button.tsx',
    value: current,
    item,
  };
}

const meta = {
  title: 'Components/MetricsTreemap/Tile',
  component: Tile,
  decorators: [
    // Tiles are absolutely positioned inside the treemap canvas
    (Story, { args }) => (
      <div
        style={{
          position: 'relative',
          width: args.left + args.width,
          height: args.top + args.height,
        }}
      >
        <Story />
      </div>
    ),
    getWrapperDecorator(),
  ],
  args: {
    left: 0,
    top: 0,
    width: 240,
    height: 96,
    data: createTreeLeaf(CURRENT_VALUE_BY_DELTA_TYPE.NEGATIVE),
    onClick: action('CLICK'),
  },
} satisfies Meta<typeof Tile>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * Size
 */
export const SizeSmall: Story = {
  args: {
    width: 160,
    height: 36,
  },
};

export const SizeMinimal: Story = {
  args: {
    width: 48,
    height: 24,
  },
};

/**
 * Position
 */
export const FirstColumn: Story = {
  args: {
    left: PADDING_INNER,
  },
};

/**
 * Label
 */
export const LabelFallback: Story = {
  args: {
    data: {
      ...createTreeLeaf(CURRENT_VALUE_BY_DELTA_TYPE.NEGATIVE),
      label: '',
    },
  },
};

/**
 * Delta type
 */
export const NoChange: Story = {
  args: {
    data: createTreeLeaf(CURRENT_VALUE_BY_DELTA_TYPE.NO_CHANGE),
  },
};

export const LowNegative: Story = {
  args: {
    data: createTreeLeaf(CURRENT_VALUE_BY_DELTA_TYPE.LOW_NEGATIVE),
  },
};

export const Negative: Story = {
  args: {
    data: createTreeLeaf(CURRENT_VALUE_BY_DELTA_TYPE.NEGATIVE),
  },
};

export const HighNegative: Story = {
  args: {
    data: createTreeLeaf(CURRENT_VALUE_BY_DELTA_TYPE.HIGH_NEGATIVE),
  },
};

export const LowPositive: Story = {
  args: {
    data: createTreeLeaf(CURRENT_VALUE_BY_DELTA_TYPE.LOW_POSITIVE),
  },
};

export const Positive: Story = {
  args: {
    data: createTreeLeaf(CURRENT_VALUE_BY_DELTA_TYPE.POSITIVE),
  },
};

export const HighPositive: Story = {
  args: {
    data: createTreeLeaf(CURRENT_VALUE_BY_DELTA_TYPE.HIGH_POSITIVE),
  },
};
