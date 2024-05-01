import { useCallback, useEffect, useMemo } from 'react';
import { useLocalStorage } from 'react-use';
import { StringParam, useQueryParams } from 'use-query-params';

import { MetricsDisplayType } from '../constants';

const DEFAULT_VALUE = MetricsDisplayType.TABLE;
const DEFAULT_GROUP_BY = '';

// Display type query param name
const QUERY_PARAM_VALUE = 'dt';
// Display type group by param name
const QUERY_PARAM_GROUP_BY = 'dtg';

type UseMetricsDisplayType = [
  { value: MetricsDisplayType; groupBy?: string },
  (value: MetricsDisplayType, newGroupBy?: string) => void,
];

export const useMetricsDisplayType = (
  groups?: Partial<Record<MetricsDisplayType, Array<string>>>,
): UseMetricsDisplayType => {
  const [queryParams, setQueryParams] = useQueryParams({
    [QUERY_PARAM_VALUE]: StringParam,
    [QUERY_PARAM_GROUP_BY]: StringParam,
  });

  const { [QUERY_PARAM_VALUE]: queryParamValue, [QUERY_PARAM_GROUP_BY]: queryParamGroupBy } =
    queryParams;

  const [storageValue, setStorageValue] = useLocalStorage(QUERY_PARAM_VALUE, DEFAULT_VALUE);
  const [storageGroupBy, setStorageGroupBy] = useLocalStorage(
    QUERY_PARAM_GROUP_BY,
    DEFAULT_GROUP_BY,
  );

  /**
   * Normalize display type value
   */
  const value = useMemo(() => {
    const resolvedValue = queryParamValue || storageValue;

    if (!resolvedValue) {
      return DEFAULT_VALUE;
    }

    if (!Object.values(MetricsDisplayType).includes(resolvedValue as MetricsDisplayType)) {
      return DEFAULT_VALUE;
    }

    return resolvedValue as MetricsDisplayType;
  }, [queryParamValue, storageValue]);

  /**
   * Normalize display type group by
   */
  const groupBy = useMemo(() => {
    const resolvedValue = queryParamGroupBy || storageGroupBy;

    if (!resolvedValue) {
      return DEFAULT_GROUP_BY;
    }

    if (!groups?.[value]?.includes(resolvedValue as MetricsDisplayType)) {
      return DEFAULT_GROUP_BY;
    }

    return resolvedValue;
  }, [queryParamGroupBy, storageGroupBy]);

  /**
   * Synchronize query params when values are different
   */
  useEffect(() => {
    if (value !== queryParamValue || groupBy !== queryParamGroupBy) {
      setQueryParams({ [QUERY_PARAM_VALUE]: value, [QUERY_PARAM_GROUP_BY]: groupBy });
    }
  }, [value, queryParamValue, groupBy, queryParamGroupBy, setQueryParams]);

  /**
   * Synchronize storeage when values are different
   */
  useEffect(() => {
    if (value !== storageValue) {
      setStorageValue(value);
    }
    if (groupBy !== storageValue) {
      setStorageGroupBy(groupBy);
    }
  }, [
    value,
    storageValue,
    groupBy,
    storageGroupBy,
    setQueryParams,
    setStorageValue,
    setStorageGroupBy,
  ]);

  const setDisplayType = useCallback(
    (newValue: MetricsDisplayType, newGroupBy: string = DEFAULT_GROUP_BY) => {
      setStorageValue(newValue);
      setStorageGroupBy(newGroupBy);

      setQueryParams({
        [QUERY_PARAM_VALUE]: newValue,
        [QUERY_PARAM_GROUP_BY]: newGroupBy,
      });
    },
    [setStorageValue, setQueryParams],
  );

  return [{ value, groupBy }, setDisplayType];
};
