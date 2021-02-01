import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getGlobalMetricType, getMetricRunInfo } from '@bundle-stats/utils';

import { Tooltip } from '../../ui';
import { Metric } from '../metric';
import { Delta } from '../delta';
import css from './summary-item.module.css';

export const SummaryItem = ({
  className,
  as: Component,
  size,
  id,
  data,
  loading,
  showDelta,
  showMetricDescription,
  inline,
  ...props
}) => {
  const { baseline, current } = data || { baseline: 0, current: 0 };

  const metric = getGlobalMetricType(id);
  const runInfo = getMetricRunInfo(metric, current, baseline);
  const showMetricDescriptionTooltip = showMetricDescription && metric?.description;

  const rootClassName = cx(
    css.root,
    className,
    css[size],
    inline && css.inline,
    showMetricDescription && css.showMetricDescription,
    showMetricDescriptionTooltip && css.showMetricDescription,
    showDelta && css.showDelta,
  );

  return (
    <Component className={rootClassName} {...props}>
      <Tooltip
        as="h3"
        className={css.title}
        title={
          showMetricDescriptionTooltip && <p className={css.helpTooltip}>{metric.description}</p>
        }
      >
        {metric.label}
      </Tooltip>

      {!loading ? (
        <Metric
          className={css.currentMetric}
          value={current}
          formatter={metric.formatter}
          enhanced
          inline={inline}
        >
          {showDelta && (
            <Delta
              className={css.delta}
              displayValue={runInfo.displayDeltaPercentage}
              deltaType={runInfo.deltaType}
            />
          )}
        </Metric>
      ) : (
        <span className={cx(css.currentMetric, css.loading)} />
      )}
    </Component>
  );
};

SummaryItem.defaultProps = {
  className: '',
  as: 'div',
  data: null,
  size: 'medium',
  loading: false,
  showMetricDescription: false,
  showDelta: true,
  inline: false,
};

SummaryItem.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Custom component */
  as: PropTypes.elementType,

  /** Size modifier */
  size: PropTypes.oneOf(['medium', 'large']),

  /** Metric id */
  id: PropTypes.string.isRequired,

  /** Loading flag */
  loading: PropTypes.bool,

  /** Summary data */
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types

  /** Show description */
  showMetricDescription: PropTypes.bool,

  /** Show delta */
  showDelta: PropTypes.bool,

  /** Inline flag */
  inline: PropTypes.bool,
};
