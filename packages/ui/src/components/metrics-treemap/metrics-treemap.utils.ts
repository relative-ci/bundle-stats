import { useCallback, useEffect, useRef, useState } from 'react';
import { useTooltipState } from 'ariakit/tooltip';
import {
  DeltaType,
  type MetricRunInfoBaseline,
  type MetricRunInfo,
  type ReportMetricRow,
} from '@bundle-stats/utils';

import {
  type TreeLeaf,
  type TreeNode,
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

/**
 * Index every tree node by id, to allow resolving the hovered node from the
 * `data-treemap-id` DOM marker without walking the tree on every pointer move
 */
export function getTreemapNodesIndex(
  node: Tree,
  index: Map<string, TreeNode> = new Map(),
): Map<string, TreeNode> {
  index.set(node.id, node);

  node.children.forEach((childNode) => {
    if ('children' in childNode) {
      getTreemapNodesIndex(childNode, index);
      return;
    }

    index.set(childNode.id, childNode);
  });

  return index;
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

interface UseTreemapTooltipStateOptions {
  /**
   * Tooltip gutter
   */
  gutter?: number;
  /**
   * Delay before showing the tooltip
   */
  timeout?: number;
  /**
   * Delay before hiding the tooltip once the pointer is no longer over a cell.
   *
   * Tiles are separated by a gutter that belongs to no node, so without this
   * grace period moving from one cell to another would close and reopen the
   * tooltip every time the pointer crosses the gap.
   */
  hideTimeout?: number;
}

/**
 * Ariakit tooltip state shared by every tile/tile group of a treemap.
 *
 * The tooltip is anchored to a virtual 1x1 rect that follows the pointer, so
 * no `TooltipAnchor` is rendered per cell: the anchor position is stored on a
 * ref and ariakit is asked to reposition at most once per animation frame,
 * which keeps the treemap itself out of the pointer move render path.
 *
 * The hovered node id is owned here as well, so that all the tooltip timing
 * lives in a single place.
 */
export function useTreemapTooltipState(options: UseTreemapTooltipStateOptions = {}) {
  const { gutter = 16, timeout = 240, hideTimeout = timeout } = options;

  const pointerRef = useRef<{ x: number; y: number } | null>(null);
  const frameRef = useRef(0);
  const hideTimeoutRef = useRef(0);

  // Return custom rect based on the pointer position
  const getAnchorRect = useCallback(() => {
    const pointer = pointerRef.current;

    // Skip the custom rect until we have a pointer position
    if (!pointer) {
      return null;
    }

    return { x: pointer.x, y: pointer.y, w: 1, h: 1 };
  }, []);

  const tooltipState = useTooltipState({ gutter, getAnchorRect, timeout });
  const { mounted, render, show, hide } = tooltipState;

  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const hoveredNodeIdRef = useRef<string | null>(null);

  useEffect(
    () => () => {
      cancelAnimationFrame(frameRef.current);
      window.clearTimeout(hideTimeoutRef.current);
    },
    [],
  );

  const setPointer = useCallback(
    (x: number, y: number) => {
      pointerRef.current = { x, y };

      // Reposition only while the tooltip is visible, once per frame
      if (!mounted || frameRef.current) {
        return;
      }

      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = 0;
        render();
      });
    },
    [mounted, render],
  );

  const commitHoveredNode = useCallback(
    (nodeId: string | null) => {
      hoveredNodeIdRef.current = nodeId;
      setHoveredNodeId(nodeId);

      if (nodeId === null) {
        hide();
        return;
      }

      show();
    },
    [hide, show],
  );

  /**
   * Set the hovered node. Showing another node is applied right away, while
   * hiding is deferred so that the tooltip survives the gap between two cells.
   */
  const setHoveredNode = useCallback(
    (nodeId: string | null) => {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = 0;

      // Guard against re-triggering `show`, which would restart the show timeout
      if (nodeId === hoveredNodeIdRef.current) {
        return;
      }

      if (nodeId !== null || !hideTimeout) {
        commitHoveredNode(nodeId);
        return;
      }

      hideTimeoutRef.current = window.setTimeout(() => {
        hideTimeoutRef.current = 0;
        commitHoveredNode(null);
      }, hideTimeout);
    },
    [commitHoveredNode, hideTimeout],
  );

  /**
   * Hide the tooltip right away, without the grace period - the pointer left
   * the treemap, there is no next cell to move to.
   */
  const clearHoveredNode = useCallback(() => {
    window.clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = 0;

    if (hoveredNodeIdRef.current === null) {
      return;
    }

    commitHoveredNode(null);
  }, [commitHoveredNode]);

  return { tooltipState, setPointer, hoveredNodeId, setHoveredNode, clearHoveredNode };
}
