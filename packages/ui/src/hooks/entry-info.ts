import { useCallback } from 'react';

interface UseEntryInfoParams {
  setState: (data: { entryId: string }) => void;
}

type UseEntryInfo = [() => void, (entryId: string) => void];

/**
 * Show/hide side panel entry
 */
export function useEntryInfo(params: UseEntryInfoParams): UseEntryInfo {
  const { setState } = params;

  const hideEntryInfo = useCallback(() => setState({ entryId: '' }), [setState]);
  const showEntryInfo = useCallback((entryId: string) => setState({ entryId }), [setState]);

  return [hideEntryInfo, showEntryInfo];
}
