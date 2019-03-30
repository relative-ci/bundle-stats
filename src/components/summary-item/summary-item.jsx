import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getDelta, getMetric, formatDelta } from '@relative-ci/utils';

import { Metric } from '../metric';
import { Delta } from '../delta';
import css from './summary-item.css';

export const SummaryItem = ({
  className, id, data, loading,
}) => {
  const { baseline, current } = data || { baseline: 0, current: 0 };

  const metric = getMetric(id);
  const delta = getDelta({ value: baseline }, { value: current });

  const rootClassName = cx(css.root, className);

  return (
    <div className={rootClassName}>
      <h3 className={css.title}>
        {metric.label}
      </h3>

      <div className={css.currentContainer}>
        {!loading ? (
          <Metric
            className={css.currentMetric}
            value={current}
            formatter={metric.formatter}
          />
        ) : (
          <span className={cx(css.currentMetric, css.loading)} />
        )}

        {!loading && delta ? (
          <Delta
            className={css.delta}
            value={delta}
            displayValue={formatDelta(delta)}
            biggerIsBetter={metric.biggerIsBetter}
          />
        ) : null}
      </div>

      {!loading ? (
        <Metric
          className={css.baselineMetric}
          value={baseline}
          formatter={metric.formatter}
        />
      ) : (
        <span className={cx(css.baselineMetric, css.loading)} />
      )}
    </div>
  );
};

SummaryItem.defaultProps = {
  className: '',
  data: null,
};

SummaryItem.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Metric id */
  id: PropTypes.string.isRequired,

  /** Loading flag */
  loading: PropTypes.bool.isRequired,

  /** Summary data */
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};
