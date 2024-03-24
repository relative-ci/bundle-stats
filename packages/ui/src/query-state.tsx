import React, { useCallback } from 'react';
import isEqual from 'lodash/isEqual';
import { QueryParamProvider, useQueryParams } from 'use-query-params';
import { ReactRouter5Adapter } from 'use-query-params/adapters/react-router-5';
import { COMPONENT_STATE_META } from '@bundle-stats/utils';

interface QueryStateProviderProps {
  children: React.ReactNode;
}

export const QueryStateProvider = (props: QueryStateProviderProps) => (
  <QueryParamProvider adapter={ReactRouter5Adapter} {...props} />
);

export const useComponentQueryState = (componentName: string) => {
  const [queryState, setQueryState] = useQueryParams({
    [componentName]: COMPONENT_STATE_META[componentName],
  });

  const componentState = queryState[componentName];

  const setState = useCallback(
    (updates: Record<string, unknown>) => {
      const newState = { ...componentState, ...updates };

      // Deep check to prevent unnecessary state changes
      if (isEqual(componentState, newState)) {
        return;
      }

      setQueryState({ [componentName]: newState });
    },
    [componentState, setQueryState],
  );

  return [componentState, setState];
};
