import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';
import { HierarchyRectangularNode, hierarchy, treemap, treemapSquarify } from 'd3';
import type { ReportMetricRow } from '@bundle-stats/utils';

import { getWrapperDecorator } from '../../../stories';
import {
  type Tree,
  type TreeNode,
  SQUARIFY_RATIO,
  PADDING_OUTER,
  PADDING_INNER,
  NESTED_PADDING,
  NESTED_PADDING_TOP,
  NESTED_PADDING_LEFT,
} from '../metrics-treemap.constants';
import {
  CURRENT_VALUE_BY_DELTA_TYPE as VALUES,
  createReportMetricRow,
} from '../metrics-treemap.stories.utils';
import { getTreemapNodes, getTreemapNodesGroupedByPath } from '../metrics-treemap.utils';
import { TileGroup } from '.';

const WIDTH = 480;
const HEIGHT = 270;

const ITEMS = [
  createReportMetricRow('src/components/button/button.tsx', VALUES.NEGATIVE),
  createReportMetricRow('src/components/button/button.css', VALUES.NO_CHANGE),
  createReportMetricRow('src/components/input/input.tsx', VALUES.HIGH_NEGATIVE),
  createReportMetricRow('src/components/input/input.css', VALUES.LOW_POSITIVE),
  createReportMetricRow('src/utils/format.ts', VALUES.POSITIVE),
  createReportMetricRow('src/assets/logo.svg', VALUES.NO_CHANGE),
  createReportMetricRow('src/index.ts', VALUES.NO_CHANGE),
];

const ITEMS_NO_CHANGE = [
  createReportMetricRow('src/components/button.tsx', VALUES.NO_CHANGE),
  createReportMetricRow('src/components/input.tsx', VALUES.NO_CHANGE),
  createReportMetricRow('src/index.ts', VALUES.NO_CHANGE),
];

const ITEMS_POSITIVE = [
  createReportMetricRow('src/components/button.tsx', VALUES.POSITIVE),
  createReportMetricRow('src/components/input.tsx', VALUES.HIGH_POSITIVE),
  createReportMetricRow('src/index.ts', VALUES.NO_CHANGE),
];

/**
 * Resolve the root tile group props - same layout as `MetricsTreemap`
 */
function getTileGroupArgs(
  treeNodes: Tree,
  options: { nested?: boolean; width?: number; height?: number } = {},
) {
  const { nested = false, width = WIDTH, height = HEIGHT } = options;

  const customHierarchy = hierarchy<Tree>(treeNodes);
  customHierarchy.sum((node) => node.value);
  // @ts-expect-error
  customHierarchy.sort((a, b) => b.value - a.value);

  let createTreemapLayout = treemap()
    .size([width, height])
    .tile(treemapSquarify.ratio(SQUARIFY_RATIO))
    .paddingOuter(PADDING_OUTER);

  if (nested) {
    createTreemapLayout = createTreemapLayout
      .padding(NESTED_PADDING)
      .paddingLeft(NESTED_PADDING_LEFT)
      .paddingTop(NESTED_PADDING_TOP);
  } else {
    createTreemapLayout = createTreemapLayout.paddingInner(PADDING_INNER);
  }

  // @ts-expect-error
  const rootNode = createTreemapLayout(customHierarchy) as HierarchyRectangularNode<TreeNode>;
  const rootData = rootNode.data as Tree;

  return {
    title: nested ? rootData.label : undefined,
    total: rootData.total,
    id: rootData.id,
    childNodes: rootNode.children,
    nested,
    left: rootNode.x0,
    top: rootNode.y0,
    absoluteLeft: rootNode.x0,
    absoluteTop: rootNode.y0,
    width: rootNode.x1 - rootNode.x0,
    height: rootNode.y1 - rootNode.y0,
  };
}

function getNestedTileGroupArgs(
  items: Array<ReportMetricRow>,
  options: { width?: number; height?: number } = {},
) {
  return getTileGroupArgs(getTreemapNodesGroupedByPath(items), { ...options, nested: true });
}

const meta = {
  title: 'Components/MetricsTreemap/TileGroup',
  component: TileGroup,
  decorators: [
    // Tile groups are absolutely positioned inside the treemap canvas
    (Story, { args }) => (
      <div
        style={{
          position: 'relative',
          width: args.width,
          height: args.height,
          background: 'var(--color-background)',
        }}
      >
        <Story />
      </div>
    ),
    getWrapperDecorator(),
  ],
  args: {
    ...getTileGroupArgs(getTreemapNodes(ITEMS)),
    onItemClick: action('ITEM_CLICK'),
    onGroupClick: action('GROUP_CLICK'),
  },
} satisfies Meta<typeof TileGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/**
 * Nested
 */
export const Nested: Story = {
  args: getNestedTileGroupArgs(ITEMS),
};

/**
 * Delta type
 */
export const NestedNoChange: Story = {
  args: getNestedTileGroupArgs(ITEMS_NO_CHANGE),
};

export const NestedPositive: Story = {
  args: getNestedTileGroupArgs(ITEMS_POSITIVE),
};

/**
 * Size
 */
export const SizeSmall: Story = {
  args: getNestedTileGroupArgs(ITEMS, { height: 28 }),
};

export const SizeMinimal: Story = {
  args: getNestedTileGroupArgs(ITEMS, { height: 20 }),
};
