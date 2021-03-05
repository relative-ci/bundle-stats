import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { get, map, max, sum } from 'lodash';
import * as webpack from '@bundle-stats/utils/lib-esm/webpack';
import { getBundleAssetsFileTypeComponentLink } from '@bundle-stats/utils';

import { ASSETS_SIZES_FILE_TYPE_MAP } from '../../constants';
import { HorizontalBarChart } from '../../ui/horizontal-bar-chart';
import { ComponentLink } from '../component-link'
import { getColors } from '../../utils';
import { Stack } from '../../layout/stack';
import { SummaryItem } from '../summary-item';
import css from './bundle-assets-totals-chart-bars.module.css';

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
      dataGraphs[runIndex] = [...(dataGraphs[runIndex] || []), get(run, 'value', 0)];
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
    <Stack className={rootClassName} space="medium">
      {dataGraphs.map((data, runIndex) => {
        const { internalBuildNumber } = jobs[runIndex];

        const values = data.map((value, valueIndex) => ({
          value,
          color: colors[valueIndex],
          label: labels[valueIndex],
          getItemTooltip: getTooltip(valueIndex, runIndex),
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
