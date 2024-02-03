import { useMemo } from 'react';

interface UseEntryIdParams {
  setState: (data: { entryId: string }) => void;
}

export const useShowEntry = (params: UseEntryIdParams) => {
  const { setState } = params;

  return useMemo(
    () => ({
      hideEntryInfo: () => setState({ entryId: '' }),
      showEntryInfo: (entryId: string) => setState({ entryId }),
    }),
    [setState],
  );
};
