import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { get } from 'lodash';

import { SummaryItem } from '../summary-item';
import css from './summary.module.css';

const PRIMARY_METRICS = new Map([
  ['webpack.totalSizeByTypeALL'],
  ['webpack.totalInitialSizeJS'],
  ['webpack.totalInitialSizeCSS'],
  ['webpack.cacheInvalidation', { showDelta: false }],
]);

const SECONDARY_METRICS = new Map([
  ['webpack.assetCount'],
  ['webpack.chunkCount'],
  ['webpack.moduleCount'],
  ['webpack.packageCount'],
  ['webpack.duplicatePackagesCount'],
]);

export const Summary = ({ className, data, loading, showSummaryItemDelta }) => {
  const getRenderSummaryItem = (sectionProps) => ([key, keyProps]) => (
    <SummaryItem
      key={key}
      id={key}
      data={get(data, key)}
      loading={loading}
      showMetricDescription
      showDelta={showSummaryItemDelta}
      className={css.item}
      {...keyProps}
      {...sectionProps}
    />
  );

  return (
    <div className={cx(css.root, className)}>
      <div className={css.primary}>{Array.from(PRIMARY_METRICS).map(getRenderSummaryItem())}</div>
      <div className={css.secondary}>
        {Array.from(SECONDARY_METRICS).map(getRenderSummaryItem({ inline: true }))}
      </div>
    </div>
  );
};

Summary.defaultProps = {
  className: '',
  data: null,
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
  loading: PropTypes.bool,
  showSummaryItemDelta: PropTypes.bool,
  showSummaryItemBaselineValue: PropTypes.bool,
};
