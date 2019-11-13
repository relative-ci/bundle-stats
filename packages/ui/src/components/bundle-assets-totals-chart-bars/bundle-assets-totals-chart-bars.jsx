import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  get, map, max, sum,
} from 'lodash';
import {
  addMetricsData, getStatsByMetrics, mergeRunsById,
} from '@bundle-stats/utils';

import { HorizontalBarChart } from '../../ui';
import { SummaryItem } from '../summary-item';
import { getColors } from '../chart/chart.utils';
import css from './bundle-assets-totals-chart-bars.module.css';

const METRICS = [
  'webpack.assets.totalSizeByTypeJS',
  'webpack.assets.totalSizeByTypeCSS',
  'webpack.assets.totalSizeByTypeIMG',
  'webpack.assets.totalSizeByTypeMEDIA',
  'webpack.assets.totalSizeByTypeFONT',
  'webpack.assets.totalSizeByTypeHTML',
  'webpack.assets.totalSizeByTypeOTHER',
];

export const BundleAssetsTotalsChartBars = ({ className, jobs }) => {
  const rootClassName = cx(css.root, className);

  const items = addMetricsData(mergeRunsById(
    map(jobs, (job) => getStatsByMetrics(get(job, 'stats', {}), METRICS)),
  ));

  const dataGraphs = [];

  items.forEach(({ runs }) => {
    runs.forEach(({ value }, runIndex) => {
      dataGraphs[runIndex] = [
        ...dataGraphs[runIndex] || [],
        value,
      ];
    });
  });

  const maxValues = max(map(dataGraphs, (values) => sum(values)));
  const maxValue = max(maxValues);

  const labels = items.map(({ label }) => label);
  const colors = getColors(max(map(dataGraphs, (values) => values.length)));
  const getTooltip = (itemIndex, runIndex) => () => (
    <SummaryItem
      className={css.itemTooltip}
      id={get(items, [itemIndex, 'key'])}
      data={{
        current: get(items, [itemIndex, 'runs', runIndex, 'value'], 0),
        baseline: get(items, [itemIndex, 'runs', runIndex + 1, 'value'], 0),
      }}
      showDelta={runIndex < jobs.length - 1}
      showBaselineValue={runIndex < jobs.length - 1}
      size="large"
    />
  );

  return (
    <div className={rootClassName}>
      <h3 className={css.title}>
        Total size by type
      </h3>

      <div className={css.items}>
        {dataGraphs.map((data, runIndex) => {
          const { internalBuildNumber } = jobs[runIndex];

          const values = data.map((value, valueIndex) => ({
            value,
            color: colors[valueIndex],
            label: labels[valueIndex],
            getItemTooltip: getTooltip(valueIndex, runIndex),
          }));

          return (
            <div
              key={internalBuildNumber}
              className={css.item}
            >
              <h3 className={css.itemTitle}>
                {`Job #${internalBuildNumber}`}
              </h3>
              <HorizontalBarChart
                className={css.itemChart}
                data={{ labels, values }}
                maxValue={maxValue}
              />
            </div>
          );
        })}
      </div>
    </div>
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
