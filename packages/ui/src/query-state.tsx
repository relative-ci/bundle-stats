import React, { useCallback, useRef } from 'react';
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

  // Read the latest state from a ref to keep `setState` stable across state changes
  const componentStateRef = useRef(componentState);
  componentStateRef.current = componentState;

  const setState = useCallback(
    (updates: Record<string, unknown>) => {
      const currentState = componentStateRef.current;
      const newState = { ...currentState, ...updates };

      // Deep check to prevent unnecessary state changes
      if (isEqual(currentState, newState)) {
        return;
      }

      setQueryState({ [componentName]: newState });
    },
    [componentName, setQueryState],
  );

  return [componentState, setState];
};
