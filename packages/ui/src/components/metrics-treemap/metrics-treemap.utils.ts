import { type RefObject, useCallback } from 'react';
import { useDebounce, useMouseHovered } from 'react-use';
import { useTooltipState } from 'ariakit/tooltip';
import {
  DeltaType,
  type MetricRunInfoBaseline,
  type MetricRunInfo,
  type ReportMetricRow,
} from '@bundle-stats/utils';

import {
  type TreeLeaf,
  type TreeNodeChildren,
  type Tree,
  type TreeTotal,
  type TileSizeDisplay,
  type TileGroupSizeDisplay,
  NESTED_PADDING_TOP,
} from './metrics-treemap.constants';

const ROOT_LABEL = '(root)';

/**
 * Set node value to the largest run value to allow to
 * display the impact of deleted/new entries
 */
function getReportMetricRowMaxValue(item: ReportMetricRow): number {
  const values = item.runs.map((run) => run?.value || 0);
  return Math.max(...values);
}

/**
 * Generate treemap node list(flat)
 */
export function getTreemapNodes(items: Array<ReportMetricRow>): Tree {
  const rootChildren: Array<TreeLeaf> = items.map((item) => ({
    id: item.key,
    label: item.label,
    value: getReportMetricRowMaxValue(item),
    item,
  }));

  return {
    id: '',
    label: ROOT_LABEL,
    value: 0,
    children: rootChildren,
  };
}

function getItemValues(runs: ReportMetricRow['runs']): TreeTotal {
  const runCount = runs?.length;
  const current = runs[0]?.value || 0;

  if (runs.length < 2) {
    return { current, baseline: undefined };
  }

  return {
    current,
    baseline: runs?.[runCount - 1]?.value,
  };
}

/**
 * Recursively set treemap nodes
 */
function setTreeNode(
  nodes: TreeNodeChildren,
  slugs: Array<string>,
  currentSlugId: number,
  newNode: TreeLeaf,
): TreeTotal {
  const baseSlugs = slugs.slice(0, currentSlugId);
  const [currentSlug, ...restSlug] = slugs.slice(currentSlugId);

  // Add to current nodes if there are no child nodes
  if (!currentSlug) {
    nodes.push(newNode);
    return getItemValues(newNode.item.runs);
  }

  const currentNodePath = [...baseSlugs, currentSlug].join('/');

  // Check for existing parent in current nodes
  let parentNode = nodes.find((treeNode) => treeNode.id === currentNodePath) as Tree;

  // accumulate children values
  const nodeValues = getItemValues(newNode?.item?.runs);
  const hasBaseline = typeof nodeValues.baseline !== 'undefined';

  // Create the new parentNode if missing
  if (!parentNode) {
    parentNode = {
      id: currentNodePath,
      label: currentSlug,
      value: 0,
      children: [],
      total: {
        current: 0,
        baseline: hasBaseline ? 0 : undefined,
      },
    };

    nodes.push(parentNode);
  }

  parentNode.total = {
    current: (parentNode.total?.current || 0) + nodeValues.current,
    baseline: hasBaseline
      ? (parentNode.total?.baseline || 0) + (nodeValues.baseline || 0)
      : undefined,
  };

  // If there are no other slugs, the new node is as leaf and we add it to the parent
  if (restSlug.length === 0) {
    parentNode.children.push(newNode);
    return getItemValues(newNode.item.runs);
  }

  return setTreeNode(parentNode.children, slugs, currentSlugId + 1, newNode);
}

/**
 * Generate treemap nodes tree by directory
 */
export function getTreemapNodesGroupedByPath(items: Array<ReportMetricRow>): Tree {
  const treeNodes: TreeNodeChildren = [];
  const total: TreeTotal = { current: 0, baseline: undefined };

  items.forEach((item) => {
    const slugs = item.key.split('/');
    const baseSlugs = slugs.slice(0, -1);
    const baseName = slugs.slice(-1)[0];

    const treeNode = {
      id: item.key,
      label: baseName,
      value: getReportMetricRowMaxValue(item),
      item,
    };

    const childrenTotal = setTreeNode(treeNodes, baseSlugs, 0, treeNode);

    total.current += childrenTotal.current;
    total.baseline =
      typeof childrenTotal.baseline !== 'undefined'
        ? (total.baseline || 0) + childrenTotal.baseline
        : undefined;
  });

  return {
    id: '',
    label: ROOT_LABEL,
    value: 0,
    children: treeNodes,
    total,
  };
}

export function resolveGroupDeltaType(
  metricRunInfo?: MetricRunInfo | MetricRunInfoBaseline,
): DeltaType.NO_CHANGE | DeltaType.NEGATIVE | DeltaType.POSITIVE {
  if (!metricRunInfo) {
    return DeltaType.NO_CHANGE;
  }

  const deltaType = 'displayDelta' in metricRunInfo ? metricRunInfo.deltaType : undefined;

  if (deltaType?.match(/NEGATIVE/)) {
    return DeltaType.NEGATIVE;
  }

  if (deltaType?.match(/POSITIVE/)) {
    return DeltaType.POSITIVE;
  }

  return DeltaType.NO_CHANGE;
}

/**
 * Resolve the tile's size using predefined values to avoid
 * computing the size of the content for every tile
 */
const PADDING_TOP = 8;
const PADDING_BOTTOM = 8;
const PADDING_LEFT = 8;
const PADDING_RIGHT = 8;
const LINE_HEIGHT = 16;
const LINE_HEIGHT_SMALL = 13.3;

export function resolveTileGroupSizeDisplay(width: number, height: number): TileGroupSizeDisplay {
  if (height < NESTED_PADDING_TOP) {
    return 'minimal';
  }

  if (width < 24) {
    return 'minimal';
  }

  if (height < NESTED_PADDING_TOP + 8) {
    return 'small';
  }

  return 'default';
}

export function resolveTileSizeDisplay(width: number, height: number): TileSizeDisplay {
  if (height < PADDING_TOP + PADDING_BOTTOM + LINE_HEIGHT_SMALL) {
    return 'minimal';
  }

  if (width < PADDING_LEFT + PADDING_RIGHT + 42) {
    return 'minimal';
  }

  if (height < PADDING_TOP + PADDING_TOP + LINE_HEIGHT * 2) {
    return 'small';
  }

  if (width < PADDING_LEFT + PADDING_RIGHT + 96) {
    return 'small';
  }

  return 'default';
}

interface UseTooltipStateWithMouseFollowOptions {
  /**
   * React ref to parent div
   */
  parentRef: RefObject<Element>;
  /**
   * Tooltip gutter
   */
  gutter?: number;
  /**
   * Tooltip timeout
   */
  timeout?: number;
}

/**
 * Ariakit tooltip state hook with mouse follow functionality
 */
export function useTooltipStateWithMouseFollow(options: UseTooltipStateWithMouseFollowOptions) {
  const { parentRef, gutter = 16, timeout = 240 } = options;

  const pointer = useMouseHovered(parentRef, { whenHovered: true });

  // Return custom rect based on the mouse position
  const getAnchorRect = useCallback(() => {
    // Skip custom component rect area if the pointer position is empty
    if (pointer.docX === 0 && pointer.docY === 0 && pointer.elW === 0 && pointer.elH === 0) {
      return null;
    }

    const newRect = {
      x: pointer.docX - (document?.defaultView?.scrollX ?? 0),
      y: pointer.docY - (document?.defaultView?.scrollY ?? 0),
      w: 1,
      h: 1,
    };

    return newRect;
  }, [pointer.docX, pointer.docY]);

  const tooltipState = useTooltipState({ gutter, getAnchorRect, timeout });

  // Update tooltip position when pointer values change
  useDebounce(tooltipState.render, 10, [pointer.docX, pointer.docY]);

  return tooltipState;
}
