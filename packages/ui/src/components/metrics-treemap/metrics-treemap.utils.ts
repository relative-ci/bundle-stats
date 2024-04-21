import type { ReportMetricRow } from '@bundle-stats/utils';

import type {
  TreeNode,
  TreeNodeChildren,
  TreeParentNode,
  TreeRootNode,
} from './metrics-treemap.constants';

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
export function getTreemapNodes(items: Array<ReportMetricRow>): TreeRootNode {
  const rootChildren: Array<TreeNode> = items.map((item) => ({
    id: item.key,
    value: getReportMetricRowMaxValue(item),
    item,
  }));

  return {
    id: 'root',
    name: 'root',
    value: 0,
    children: rootChildren,
  };
}

/**
 * Recursively set treemap nodes
 */
function setTreeNode(nodes: TreeNodeChildren, slugs: Array<string>, newNode: TreeNode): void {
  const [currentSlug, ...restSlug] = slugs;

  if (!currentSlug) {
    nodes.push(newNode);
    return;
  }

  // Check for an existing parent
  let parentNode = nodes.find((treeNode) => treeNode.id === currentSlug) as TreeParentNode;

  // Create a new parentNode if necessary
  if (!parentNode) {
    parentNode = {
      id: currentSlug,
      value: 0,
      children: [],
    };

    nodes.push(parentNode);
  }

  // Node parent
  if (restSlug.length === 0) {
    parentNode.children.push(newNode);
    return;
  }

  setTreeNode(parentNode.children, restSlug, newNode);
}

/**
 * Generate treemap nodes tree by directory
 */
export function getTreemapNodesGroupedByPath(items: Array<ReportMetricRow>): TreeRootNode {
  const treeNodes: TreeNodeChildren = [];

  items.forEach((item) => {
    const normalizedPath = item.key.replace(/^\.\//, ''); // replace './' prefix
    const slugs = normalizedPath.split('/');
    const baseSlugs = slugs.slice(0, -1);
    const id = slugs.slice(-1)[0];

    const treeNode = {
      id,
      value: getReportMetricRowMaxValue(item),
      item: {
        ...item,
        // Set label to baseline
        label: id,
      },
    };

    setTreeNode(treeNodes, baseSlugs, treeNode);
  });

  return {
    id: 'root',
    name: 'root',
    value: 0,
    children: treeNodes,
  };
}
