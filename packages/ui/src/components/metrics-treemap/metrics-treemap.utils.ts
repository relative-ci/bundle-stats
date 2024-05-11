import {
  DeltaType,
  type MetricRunInfoBaseline,
  type MetricRunInfo,
  type ReportMetricRow,
} from '@bundle-stats/utils';

import type { TreeLeaf, TreeNodeChildren, Tree, TreeTotal } from './metrics-treemap.constants';

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

  if (runCount < 2) {
    return { current, baseline: 0 };
  }

  return {
    current,
    baseline: runs[runCount - 1]?.value || 0,
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

  // Create the new parentNode if missing
  if (!parentNode) {
    parentNode = {
      id: currentNodePath,
      label: currentSlug,
      value: 0,
      children: [],
      total: {
        current: 0,
        baseline: 0,
      },
    };

    nodes.push(parentNode);
  }

  // accumulate children values
  const nodeValues = getItemValues(newNode?.item?.runs);

  parentNode.total = {
    current: (parentNode.total?.current || 0) + nodeValues.current,
    baseline: (parentNode.total?.baseline || 0) + (nodeValues.baseline || 0),
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
  const total = { current: 0, baseline: 0 };

  items.forEach((item) => {
    // const normalizedPath = item.key.replace(/^\.?\//, ''); // replace './' or '/' prefix
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

    total.current += childrenTotal.current || 0;
    total.baseline += childrenTotal.baseline || 0;
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
