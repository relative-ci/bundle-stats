import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import map from 'lodash/map';
import max from 'lodash/max';
import sum from 'lodash/sum';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';
import { getBundleAssetsFileTypeComponentLink, getGlobalMetricType, getMetricRunInfo } from '@bundle-stats/utils';

import { ASSETS_SIZES_FILE_TYPE_MAP } from '../../constants';
import { HorizontalBarChart } from '../../ui/horizontal-bar-chart';
import { ComponentLink } from '../component-link'
import { getColors } from '../../utils';
import { Stack } from '../../layout/stack';
import { SummaryItem } from '../summary-item';
import css from './bundle-assets-totals-chart-bars.module.css';

const getTooltip = (items, jobs, itemIndex, runIndex) => () => {
  const metricId = items?.[itemIndex]?.key;
  const metric = getGlobalMetricType(metricId);
  const current = items?.[itemIndex]?.runs?.[runIndex]?.value || 0;
  const baseline = items?.[itemIndex]?.runs?.[runIndex + 1]?.value || 0;
  const metricRunInfo = getMetricRunInfo(metric, current, baseline);

  return (
    <SummaryItem
      className={css.itemTooltip}
      title={metric.label}
      current={metricRunInfo.displayValue}
      {...(runIndex < jobs.length - 1 && {
        baseline: metric.formatter(baseline),
        delta: metricRunInfo.displayDeltaPercentage,
        deltaType: metricRunInfo.deltaType,
      })}
      size="large"
    />
  );
};

export const BundleAssetsTotalsChartBars = ({
  className,
  jobs,
  customComponentLink: CustomComponentLink,
}) => {
  const rootClassName = cx(css.root, className);
  const items = webpack.compareBySection.sizes(jobs);

  const dataGraphs = [];

  items.forEach(({ runs }) => {
    runs.forEach((run, runIndex) => {
      dataGraphs[runIndex] = [...(dataGraphs[runIndex] || []), run?.value || 0];
    });
  });

  const maxValues = max(map(dataGraphs, (values) => sum(values)));
  const maxValue = max(maxValues);

  const labels = items.map(({ key, label }) => {
    const fileType = ASSETS_SIZES_FILE_TYPE_MAP[key];
    const componentData = getBundleAssetsFileTypeComponentLink(fileType, label);
    return (
      <CustomComponentLink className={css.itemLink} {...componentData}>
        {label}
      </CustomComponentLink>
    );
  });
  const colors = getColors(max(map(dataGraphs, (values) => values.length)));

  return (
    <Stack className={rootClassName} space="medium">
      {dataGraphs.map((data, runIndex) => {
        const { internalBuildNumber } = jobs[runIndex];

        const values = data.map((value, valueIndex) => ({
          value,
          color: colors[valueIndex],
          label: labels[valueIndex],
          getItemTooltip: getTooltip(items, jobs, valueIndex, runIndex),
        }));

        return (
          <div key={internalBuildNumber || runIndex} className={css.item}>
            <h3 className={css.itemTitle}>{`Job #${internalBuildNumber}`}</h3>
            <HorizontalBarChart
              className={css.itemChart}
              data={{ labels, values }}
              maxValue={maxValue}
            />
          </div>
        );
      })}
    </Stack>
  );
};

BundleAssetsTotalsChartBars.defaultProps = {
  className: '',
  customComponentLink: ComponentLink,
};

BundleAssetsTotalsChartBars.propTypes = {
  className: PropTypes.string,
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      internalBuildNumber: PropTypes.number,
    }),
  ).isRequired,
  customComponentLink: PropTypes.elementType,
};
