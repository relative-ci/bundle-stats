import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { get } from 'lodash';

import { SummaryItem } from '../summary-item';
import css from './summary.module.css';

export const Summary = ({ className, data, keys, loading, showSummaryItemDelta }) => {
  const getRenderSummaryItem = (itemProps) => (key) => (
    <div className={css.item}>
      <SummaryItem
        key={key}
        id={key}
        data={get(data, key)}
        loading={loading}
        showMetricDescription
        showDelta={showSummaryItemDelta}
        {...itemProps}
      />
    </div>
  );

  return (
    <div className={cx(css.root, className)}>
      <div className={css.items}>
        {keys.slice(0, 4).map(getRenderSummaryItem({ size: 'large' }))}
      </div>
      <div className={css.items}>{keys.slice(4).map(getRenderSummaryItem())}</div>
    </div>
  );
};

Summary.defaultProps = {
  className: '',
  data: null,
  keys: [
    'webpack.totalSizeByTypeALL',
    'webpack.totalInitialSizeJS',
    'webpack.totalInitialSizeCSS',
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
  keys: PropTypes.arrayOf(PropTypes.string),
  loading: PropTypes.bool,
  showSummaryItemDelta: PropTypes.bool,
  showSummaryItemBaselineValue: PropTypes.bool,
};
