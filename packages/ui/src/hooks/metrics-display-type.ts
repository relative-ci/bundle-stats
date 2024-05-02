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

type MetricsDisplayTypeData = {
  value: MetricsDisplayType;
  groupBy: string;
};

type UseMetricsDisplayType = [
  { value: MetricsDisplayType; groupBy?: string },
  (newDisplayType: MetricsDisplayType, newGroupBy?: string) => void,
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
  const [localStorage, setLocalStorage] = useLocalStorage<Partial<MetricsDisplayTypeData>>(
    'storage',
    {
      value: DEFAULT_VALUE,
      groupBy: DEFAULT_GROUP_BY,
    },
  );

  /**
   * Normalize display type value
   */
  const value = useMemo(() => {
    const resolvedValue = queryParamValue ?? localStorage?.value;

    if (!resolvedValue) {
      return DEFAULT_VALUE;
    }

    if (!Object.values(MetricsDisplayType).includes(resolvedValue as MetricsDisplayType)) {
      return DEFAULT_VALUE;
    }

    return resolvedValue as MetricsDisplayType;
  }, [queryParamValue, localStorage?.value]);

  /**
   * Normalize display type group by
   */
  const groupBy = useMemo(() => {
    const resolvedValue = queryParamGroupBy ?? localStorage?.groupBy;

    if (!resolvedValue) {
      return DEFAULT_GROUP_BY;
    }

    if (!groups?.[value]?.includes(resolvedValue as MetricsDisplayType)) {
      return DEFAULT_GROUP_BY;
    }

    return resolvedValue;
  }, [queryParamGroupBy, localStorage?.groupBy]);

  /**
   * Synchronize query params when values are different
   */
  useEffect(() => {
    if (value !== queryParamValue || groupBy !== queryParamGroupBy) {
      setQueryParams({ [QUERY_PARAM_VALUE]: value, [QUERY_PARAM_GROUP_BY]: groupBy });
    }
  }, [value, queryParamValue, groupBy, queryParamGroupBy, setQueryParams]);

  /**
   * Synchronize storage when values are different
   */
  useEffect(() => {
    if (value !== localStorage?.value || groupBy !== localStorage.groupBy) {
      setLocalStorage({ value, groupBy });
    }
  }, [value, groupBy, setLocalStorage, localStorage]);

  const setDisplayType = useCallback(
    (newValue: MetricsDisplayType, newGroupBy: string = DEFAULT_GROUP_BY) => {
      setQueryParams({
        [QUERY_PARAM_VALUE]: newValue,
        [QUERY_PARAM_GROUP_BY]: newGroupBy,
      });
    },
    [setQueryParams],
  );

  return useMemo(() => [{ value, groupBy }, setDisplayType], [value, groupBy, setDisplayType]);
};
