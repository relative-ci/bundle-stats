import React, { useCallback } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { JsonParam, QueryParamProvider, useQueryParams } from 'use-query-params';
import { merge } from 'lodash';

export const QueryStateProvider = (props) => {
  const history = useHistory();
  const location = useLocation();

  return (
    <QueryParamProvider ReactRouterRoute={Route} location={location} history={history} {...props} />
  );
};

export const useComponentQueryState = (componentName) => {
  const [search, setSearch] = useQueryParams({
    [componentName]: JsonParam,
  });

  const state = search[componentName];

  const setState = useCallback(
    (newState) => {
      setSearch({ [componentName]: merge({}, state, newState) });
    },
    [state],
  );

  return [state, setState];
};
