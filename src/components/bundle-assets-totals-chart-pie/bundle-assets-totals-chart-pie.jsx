import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  omit, floor, sortBy,
} from 'lodash';
import {
  getMetric, formatFileSize, mergeRunsById,
} from '@relative-ci/utils';

import {
  PIE_PROPS,
  RESPONSIVE_CONTAINER_PROPS,
  TOOLTIP_PROPS,
  Cell,
  Chart,
  Legend,
  PieChart,
  Pie,
  ResponsiveContainer,
  RechartsTooltip,
  getColors,
} from '../chart';
import css from './bundle-assets-totals-chart-pie.module.css';

const getMetricLabel = key => getMetric(key).label;

const TooltipContent = ({ active, payload }) => {
  if (!active) {
    return null;
  }

  const item = payload[0];

  if (!item) return null;

  const { name, value } = item;

  return (
    <div className={TOOLTIP_PROPS.contentClassName}>
      <h5>{getMetricLabel(name)}</h5>
      <p>{formatFileSize(value)}</p>
    </div>
  );
};

TooltipContent.propTypes = {
  /** Recharts RechartsTooltip active flag */
  active: PropTypes.bool.isRequired,

  /** Recharts RechartsTooltip payload array */
  payload: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.number,
  })).isRequired,
};

const LegendContent = ({ payload }) => (
  <ul className={css.legend}>
    {payload.map(({ payload: item }) => (
      <li
        key={item.key}
        className={css.legendItem}
      >
        <span className={css.legendIcon} style={{ backgroundColor: item.fill }} />
        <span className={cx(css.legendLabel, !item.value && css.legendLabelEmpty)}>
          {`${floor(item.percent * 100, 2)}% - `}
          {`${getMetricLabel(item.key)} (${formatFileSize(item.value)})`}
        </span>
      </li>
    ))}
  </ul>
);

LegendContent.propTypes = {
  /** Reacharts legend item */
  payload: PropTypes.arrayOf(PropTypes.shape({
    payload: PropTypes.shape({
      key: PropTypes.string,
      value: PropTypes.number,
      percent: PropTypes.number,
      fill: PropTypes.string,
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

export const BundleAssetsTotalsChartPie = ({ className, jobs }) => {
  const runs = jobs.map(getRun);
  const rows = sortBy(mergeRunsById(runs), 'key');

  const data = rows.map(row => ({
    key: row.key,
    value: row.runs[0].value,
  }));

  const COLORS = getColors(data.length);

  return (
    <Chart className={cx(css.root, className)} title="Bundle By File Type">
      <ResponsiveContainer {...RESPONSIVE_CONTAINER_PROPS}>
        <PieChart>
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            iconSize={12}
            content={LegendContent}
          />
          <RechartsTooltip
            {...TOOLTIP_PROPS}
            content={TooltipContent}
          />
          <Pie
            {...PIE_PROPS}
            data={data}
            nameKey="key"
            dataKey="value"
            innerRadius={30}
            minAngle={2}
          >
            {data.map(({ key }, index) => (
              <Cell
                key={key}
                fill={COLORS[index]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Chart>
  );
};

BundleAssetsTotalsChartPie.defaultProps = {
  className: '',
};

BundleAssetsTotalsChartPie.propTypes = {
  className: PropTypes.string,
  jobs: PropTypes.arrayOf(PropTypes.shape({
    internalBuildNumber: PropTypes.number,
  })).isRequired,
};
