import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { SummaryItem } from '../summary-item';
import css from './summary.module.css';

const FIRST_ROW_COUNT = 3;

export const Summary = ({
  className, firstRowCount, data, keys, loading, showSummaryItemDelta, showSummaryItemBaselineValue,
}) => {
  const getRenderSummaryItem = (itemProps) => (key) => (
    <SummaryItem
      key={key}
      className={css.item}
      id={key}
      data={data && data[key]}
      loading={loading}
      showMetricDescription
      showBaselineValue={showSummaryItemBaselineValue}
      showDelta={showSummaryItemDelta}
      {...itemProps}
    />
  );

  return (
    <div className={cx(css.root, className)}>
      <div className={css.items}>
        {keys.slice(0, firstRowCount).map(getRenderSummaryItem())}
      </div>
      <div className={css.items}>
        {keys.slice(firstRowCount).map(getRenderSummaryItem())}
      </div>
    </div>
  );
};

Summary.defaultProps = {
  className: '',
  data: null,
  firstRowCount: FIRST_ROW_COUNT,
  keys: [
    'webpack.assets.totalInitialSizeJS',
    'webpack.assets.totalInitialSizeCSS',
    'webpack.cacheInvalidation',
    'webpack.moduleCount',
    'webpack.chunkCount',
    'webpack.assetCount',
    'webpack.packageCount',
    'webpack.duplicatePackagesCount',
  ],
  loading: false,
  showSummaryItemDelta: true,
  showSummaryItemBaselineValue: false,
};

Summary.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    [PropTypes.string]: PropTypes.shape({
      baseline: PropTypes.number,
      current: PropTypes.number,
    }),
  }),
  firstRowCount: PropTypes.number,
  keys: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
  showSummaryItemDelta: PropTypes.bool,
  showSummaryItemBaselineValue: PropTypes.bool,
};
