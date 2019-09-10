import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { max, omit, sum } from 'lodash';
import { getMetricType } from '@bundle-stats/utils';

import { BarChart } from '../../ui';
import css from './bundle-assets-totals-chart-bars.module.css';

const prefixStats = (data) => Object.entries(data).map(([key, value]) => ({
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
  const rootClassName = cx(css.root, className);

  const runs = jobs.map(getRun);
  const runsValues = runs.map((run) => Object.values(run).map(({ value }) => value));
  const maxValues = runsValues.map((values) => sum(values));
  const maxValue = max(maxValues);

  return (
    <div className={rootClassName}>
      <h2 className={css.title}>
        Total size by type
      </h2>

      <div className={css.items}>
        {jobs.map((job, index) => {
          const { internalBuildNumber } = job;
          const run = runs[index];
          const metrics = Object.keys(run).map((item) => getMetricType(item));

          const labels = metrics.map(({ label }) => label);
          const values = Object.values(run).map(({ value }) => value);

          return (
            <div
              key={internalBuildNumber}
              className={css.item}
            >
              <h3 className={css.itemTitle}>
                {`Job #${internalBuildNumber}`}
              </h3>
              <BarChart
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
