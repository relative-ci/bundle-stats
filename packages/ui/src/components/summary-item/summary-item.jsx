import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getGlobalMetricType, getMetricRunInfo } from '@bundle-stats/utils';

import { Icon, Tooltip } from '../../ui';
import { Metric } from '../metric';
import { Delta } from '../delta';
import css from './summary-item.module.css';

export const SummaryItem = ({
  className, size, id, data, loading, showBaselineValue, showDelta, showMetricDescription,
}) => {
  const { baseline, current } = data || { baseline: 0, current: 0 };

  const metric = getGlobalMetricType(id);
  const runInfo = getMetricRunInfo(metric, current, baseline);

  const rootClassName = cx(
    css.root,
    className,
    css[size],
    showMetricDescription && css.showMetricDescription,
    showBaselineValue && css.showBaselineValue,
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
          displayValue={`${runInfo.displayDelta} (${runInfo.displayDeltaPercentage})`}
          deltaType={runInfo.deltaType}
        />
      ) : (
        <span className={cx(css.delta, css.loading)} />
      )}

      {!loading ? showBaselineValue && (
        <Metric
          className={css.baselineMetric}
          value={baseline}
          formatter={metric.formatter}
        />
      ) : (
        <span className={cx(css.baselineMetric, css.loading)} />
      )}

      {showMetricDescription && metric.description && (
        <Tooltip
          as="button"
          type="button"
          className={css.helpButton}
          title={(
            <div className={css.helpTooltip}>
              <h4 className={css.helpTooltipTitle}>
                {metric.label}
              </h4>
              <p className={css.helpTooltipDescription}>
                {metric.description}
              </p>
            </div>
          )}
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
  loading: false,
  showMetricDescription: false,
  showBaselineValue: false,
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
  loading: PropTypes.bool,

  /** Summary data */
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types

  /** Show description */
  showMetricDescription: PropTypes.bool,

  /** Show baseline value */
  showBaselineValue: PropTypes.bool,

  /** Show delta */
  showDelta: PropTypes.bool,
};
