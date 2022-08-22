import React, { useCallback } from 'react';
import { JsonParam, QueryParamProvider, useQueryParams } from 'use-query-params';
import { ReactRouter5Adapter } from 'use-query-params/adapters/react-router-5'
import { parse, stringify } from 'query-string'
import { isEqual, merge } from 'lodash';

export const QueryStateProvider = (props) => (
  <QueryParamProvider
    adapter={ReactRouter5Adapter}
    options={{
      searchStringToObject: parse,
      objectToSearchString: stringify,
    }}
    {...props}
  />
);

export const useComponentQueryState = (componentName) => {
  const [search, setSearch] = useQueryParams({
    [componentName]: JsonParam,
  });

  const state = search[componentName];

  const setState = useCallback(
    (newState) => {
      const newComponentState = merge({}, state, newState);

      // Deep check to prevent unnecessary state changes
      if (isEqual(newComponentState, state)) {
        return;
      }

      setSearch({ [componentName]: newComponentState });
    },
    [state],
  );

  return [state, setState];
};
