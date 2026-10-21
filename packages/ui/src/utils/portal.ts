/**
 * Ariakit appends nested portals (tooltips, hovercards, menus) to the parent portal node,
 * create the portal node with a specific class to adjust the z-index of the nested overlays
 */
export const getCreatePortalElement = (className: string) => (element: HTMLElement) => {
  const portalElement = element.ownerDocument.createElement('div');
  portalElement.className = className;
  return portalElement;
};
