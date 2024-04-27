import type { ReportMetricRow } from '@bundle-stats/utils';

import type { TreeLeaf, TreeNodeChildren, TreeNode } from './metrics-treemap.constants';

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
export function getTreemapNodes(items: Array<ReportMetricRow>): TreeNode {
  const rootChildren: Array<TreeLeaf> = items.map((item) => ({
    id: item.key,
    label: item.key,
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

/**
 * Recursively set treemap nodes
 */
function setTreeNode(
  nodes: TreeNodeChildren,
  slugs: Array<string>,
  currentSlugId: number,
  newNode: TreeLeaf,
): void {
  const baseSlugs = slugs.slice(0, currentSlugId);
  const [currentSlug, ...restSlug] = slugs.slice(currentSlugId);

  // Add to current nodes if there are no child nodes
  if (!currentSlug) {
    nodes.push(newNode);
    return;
  }

  const currentNodePath = [...baseSlugs, currentSlug].join('/');

  // Check for existing parent in current nodes
  let parentNode = nodes.find((treeNode) => treeNode.id === currentNodePath) as TreeNode;

  // Create the new parentNode if missing
  if (!parentNode) {
    parentNode = {
      id: currentNodePath,
      label: currentSlug,
      value: 0,
      children: [],
    };

    nodes.push(parentNode);
  }

  // If there are no other slugs, the new node is as leaf and we add it to the parent
  if (restSlug.length === 0) {
    parentNode.children.push(newNode);
    return;
  }

  setTreeNode(parentNode.children, slugs, currentSlugId + 1, newNode);
}

/**
 * Generate treemap nodes tree by directory
 */
export function getTreemapNodesGroupedByPath(items: Array<ReportMetricRow>): TreeNode {
  const treeNodes: TreeNodeChildren = [];

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

    setTreeNode(treeNodes, baseSlugs, 0, treeNode);
  });

  return {
    id: '',
    label: ROOT_LABEL,
    value: 0,
    children: treeNodes,
  };
}
