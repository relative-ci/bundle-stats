import get from 'lodash/get';

import { getGlobalMetricType, getMetricRunInfo } from '../utils/metrics';
import { MetricTypes } from '../constants';
import { getMetricChanged } from './get-metric-changed';
import * as types from './types';

/* eslint-disable prettier/prettier */
/**
 * Add metric item data
 */
export const getAddRowMetricData =
  (metricType?: string) => (row: types.ReportRow): types.ReportMetricRow => {
    const { key, runs } = row;

    // Resolve row metric
    // - if the key is a predefined metric, use it
    // - if the key is not matching an existing metric, use the default metricType
    const metric = getGlobalMetricType(
      key,
      typeof metricType === 'string' ? (metricType as MetricTypes) : undefined, // explicit, avoid passing of map cb params
    );
    const { biggerIsBetter, label } = metric;

    const processedRuns = runs.map((run, index) => {
      if (!run || typeof run.value === 'undefined' || run.value === null) {
        return null;
      }

      const metricRunInfo = getMetricRunInfo(
        metric,
        run.value,
        // Get baseline value only if not the latest run
        index + 1 < runs.length ? get(runs, [index + 1, 'value'], 0) : undefined,
      );

      return {
        ...run,
        ...metricRunInfo,
      };
    });

    return {
      key: row.key,

      // Metric props
      label,
      biggerIsBetter,

      // Row props
      changed: getMetricChanged(runs),

      // Runs
      runs: processedRuns,
    };
  };
/* eslint-enable prettier/prettier */
