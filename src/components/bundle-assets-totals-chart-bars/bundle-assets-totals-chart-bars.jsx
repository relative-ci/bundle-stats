import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { omit, sortBy } from 'lodash';
import {
  getMetric, formatFileSize, mergeRunsById,
} from '@relative-ci/utils';

import {
  BAR_PROPS,
  RESPONSIVE_CONTAINER_PROPS,
  TOOLTIP_PROPS,
  XAXIS_PROPS,
  YAXIS_PROPS,
  Bar,
  BarChart,
  Chart,
  ResponsiveContainer,
  RechartsTooltip,
  XAxis,
  YAxis,
  getColors,
} from '../chart';
import css from './bundle-assets-totals-chart-bars.module.css';

const getMetricLabel = key => getMetric(key).label;

const TooltipContent = ({ active, payload }) => {
  if (!active) {
    return null;
  }

  return (
    <div className={TOOLTIP_PROPS.contentClassName}>
      <h5 className={css.tooltipTitle}>
        {getMetricLabel(payload[0].payload.key)}
      </h5>
      {payload.map(({ name, value }) => (
        <p className={css.tooltipItem}>
          {`#${name}: ${formatFileSize(value)}`}
        </p>
      ))}
    </div>
  );
};

TooltipContent.propTypes = {
  /** Recharts active flag */
  active: PropTypes.bool.isRequired,

  /** Reacharts payload data */
  payload: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.number,
    payload: PropTypes.shape({
      key: PropTypes.string,
    }),
  })).isRequired,
};

const prefixStats = data => Object.entries(data).map(([key, value]) => ({
  [`webpack.assets.${key}`]: value,
})).reduce((aggregator, current) => ({
  ...aggregator,
  ...current,
}), {});

const getRun = (job) => {
  if (!job) {
    return [];
  }

  // @TODO Replace with a proper separation
  const totals = omit({ ...job.stats.webpack.assets }, [
    'totalSizeByTypeALL',
    'totalInitialSizeJS',
    'totalInitialSizeCSS',
  ]);

  return prefixStats(totals);
};

export const BundleAssetsTotalsChartBars = ({ className, jobs }) => {
  const runs = jobs.map(getRun);
  const rows = sortBy(mergeRunsById(runs), 'key');

  const data = rows.map(row => ({
    key: row.key,
    ...row.runs.reduce((agg, { value }, jobId) => ({
      ...agg,
      value,
      [jobs[jobId].internalBuildNumber]: value,
    }), {}),
  }));

  const COLORS = getColors(jobs.length);

  return (
    <Chart className={cx(className, css.chart)} title="File Type Totals By Bundle">
      <ResponsiveContainer {...RESPONSIVE_CONTAINER_PROPS}>
        <BarChart data={data}>
          <XAxis
            {...XAXIS_PROPS}
            dataKey="key"
            tickFormatter={getMetricLabel}
          />
          <YAxis
            {...YAXIS_PROPS}
            dataKey="value"
            tickFormatter={formatFileSize}
          />
          <RechartsTooltip
            {...TOOLTIP_PROPS}
            content={TooltipContent}
          />
          {jobs.map(({ internalBuildNumber }, index) => (
            <Bar
              {...BAR_PROPS}
              key={internalBuildNumber}
              dataKey={internalBuildNumber}
              fill={COLORS[index]}
              minPointSize={2}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </Chart>
  );
};

BundleAssetsTotalsChartBars.defaultProps = {
  className: '',
};

BundleAssetsTotalsChartBars.propTypes = {
  className: PropTypes.string,
  jobs: PropTypes.arrayOf(PropTypes.shape({
    internalBuildNumber: PropTypes.number,
  })).isRequired,
};
