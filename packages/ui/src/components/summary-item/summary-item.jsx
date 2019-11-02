import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {
  formatDelta, formatPercentage, getDelta, getMetricType,
} from '@bundle-stats/utils';

import { Icon, Tooltip } from '../../ui';
import { Metric } from '../metric';
import { Delta } from '../delta';
import css from './summary-item.module.css';

export const SummaryItem = ({
  className, size, id, data, loading, showDelta, showMetricDescription,
}) => {
  const { baseline, current } = data || { baseline: 0, current: 0 };

  const metric = getMetricType(id);
  const diff = getDelta({ value: baseline }, { value: current });

  const rootClassName = cx(
    css.root, className, css[size], showMetricDescription && css.showMetricDescription,
  );

  return (
    <div className={rootClassName}>
      <h3 className={css.title}>
        {metric.label}
      </h3>

      {!loading ? (
        <Metric
          className={css.currentMetric}
          value={current}
          formatter={metric.formatter}
          enhanced
        />
      ) : (
        <span className={cx(css.currentMetric, css.loading)} />
      )}

      {!loading ? showDelta && (
        <Delta
          className={css.delta}
          value={diff.deltaPercentage}
          displayValue={`${formatDelta(diff.delta, metric.formatter)} (${formatDelta(diff.deltaPercentage, formatPercentage)})`}
          biggerIsBetter={metric.biggerIsBetter}
        />
      ) : (
        <span className={cx(css.delta, css.loading)} />
      )}

      {showMetricDescription && metric.description && (
        <Tooltip
          as="button"
          type="button"
          className={css.helpButton}
          title={metric.description}
        >
          <Icon glyph="help" className={css.helpButtonIcon} />
        </Tooltip>
      )}
    </div>
  );
};

SummaryItem.defaultProps = {
  className: '',
  data: null,
  size: 'medium',
  showMetricDescription: false,
  showDelta: true,
};

SummaryItem.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Size modifier */
  size: PropTypes.oneOf(['medium', 'large']),

  /** Metric id */
  id: PropTypes.string.isRequired,

  /** Loading flag */
  loading: PropTypes.bool.isRequired,

  /** Summary data */
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types

  /** Show description */
  showMetricDescription: PropTypes.bool,

  /** Show delta */
  showDelta: PropTypes.bool,
};
