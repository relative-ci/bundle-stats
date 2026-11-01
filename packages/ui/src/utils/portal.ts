import { useEffect, useState } from 'react';

/**
 * Ariakit appends nested portals (tooltips, hovercards, menus) to the parent portal node,
 * create the portal node with a specific class to adjust the z-index of the nested overlays
 */
export const getCreatePortalElement = (className: string) => (element: HTMLElement) => {
  const portalElement = element.ownerDocument.createElement('div');
  portalElement.className = className;
  return portalElement;
};

/**
 * Create a body level portal root with a specific class, to be passed to Ariakit `PortalContext`
 * Overlays (tooltips, hovercards, menus) rendered inside the context are appended to the root,
 * so the class can adjust their z-index without affecting the overlays from other sections
 */
export const usePortalRoot = (className: string): HTMLElement | null => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const element = document.createElement('div');
    element.className = className;
    document.body.appendChild(element);
    setPortalRoot(element);

    return () => {
      element.remove();
      setPortalRoot(null);
    };
  }, [className]);

  return portalRoot;
};
