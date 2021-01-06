import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { get } from 'lodash';

import { SECTIONS } from '../../constants';
import { SummaryItem } from '../summary-item';
import css from './summary.module.css';

const PRIMARY_METRICS = new Map([
  ['webpack.totalSizeByTypeALL', { section: SECTIONS.TOTALS }],
  ['webpack.totalInitialSizeJS', { section: SECTIONS.ASSETS }],
  ['webpack.totalInitialSizeCSS', { section: SECTIONS.ASSETS }],
  ['webpack.cacheInvalidation', { section: SECTIONS.ASSETS, showDelta: false }],
]);

const SECONDARY_METRICS = new Map([
  ['webpack.assetCount', { section: SECTIONS.ASSETS }],
  ['webpack.chunkCount', { section: SECTIONS.ASSETS }],
  ['webpack.moduleCount', { section: SECTIONS.MODULES }],
  ['webpack.packageCount', { section: SECTIONS.PACKAGES }],
  ['webpack.duplicatePackagesCount', { section: SECTIONS.PACKAGES }],
]);

const DefaultSummaryItemWrapper = ({ className, children }) => (
  <div className={className}>{children}</div>
);

DefaultSummaryItemWrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

DefaultSummaryItemWrapper.defaultProps = {
  className: '',
};

export const Summary = ({ className, data, loading, showSummaryItemDelta, SummaryItemWrapper }) => {
  const getRenderSummaryItem = (sectionProps) => ([key, keyProps]) => (
    <SummaryItem
      as={(wrapperProps) => <SummaryItemWrapper {...wrapperProps} keyProps={keyProps} />}
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
  SummaryItemWrapper: DefaultSummaryItemWrapper,
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
  SummaryItemWrapper: PropTypes.elementType,
};
