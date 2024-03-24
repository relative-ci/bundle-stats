import { useCallback, useEffect, useMemo } from 'react';
import { useLocalStorage } from 'react-use';
import { StringParam, useQueryParams } from 'use-query-params';

import { MetricsDisplayType } from '../constants';

const DEFAULT_DISPLAY_TYPE = MetricsDisplayType.TABLE;
const PARAM_NAME = 'dt';

type UseMetricsDisplayType = [MetricsDisplayType, (value: MetricsDisplayType) => void];

export const useMetricsDisplayType = (): UseMetricsDisplayType => {
  const [{ [PARAM_NAME]: queryDisplayType }, setQueryParams] = useQueryParams({
    [PARAM_NAME]: StringParam,
  });
  const [storageDisplayType, setStoreageDisplayType] = useLocalStorage(
    PARAM_NAME,
    MetricsDisplayType.TABLE,
  );

  const displayType = useMemo(() => {
    const value = queryDisplayType || storageDisplayType;

    if (!value) {
      return DEFAULT_DISPLAY_TYPE;
    }

    if (!Object.values(MetricsDisplayType).includes(value as MetricsDisplayType)) {
      return DEFAULT_DISPLAY_TYPE;
    }

    return value as MetricsDisplayType;
  }, [queryDisplayType, storageDisplayType]);

  useEffect(() => {
    // Update query string display type when missing
    if (queryDisplayType !== displayType) {
      setQueryParams({ [PARAM_NAME]: displayType });
    }

    // Update storage state when query string is set and different
    if (storageDisplayType !== displayType) {
      setStoreageDisplayType(queryDisplayType as MetricsDisplayType);
    }
  }, [displayType, queryDisplayType, storageDisplayType, setQueryParams, setStoreageDisplayType]);

  const setDisplayType = useCallback(
    (value: MetricsDisplayType) => {
      setStoreageDisplayType(value);
      setQueryParams({ [PARAM_NAME]: value });
    },
    [setStoreageDisplayType, setQueryParams],
  );

  return [displayType, setDisplayType];
};
