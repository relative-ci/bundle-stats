import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { get } from 'lodash';
import { flow, map, sum } from 'lodash/fp';
import {
  METRIC_TYPE_FILE_SIZE, getGlobalMetricType, getMetricRunInfo,
} from '@bundle-stats/utils';

import { Delta } from '../delta';
import { Metric } from '../metric';
import css from './run-label-sum.module.css';

const METRIC_TYPE_DATA = getGlobalMetricType(null, METRIC_TYPE_FILE_SIZE);

const getRunRowsSum = (rows, runIndex) => flow(
  map((row) => get(row, `runs[${runIndex}].value`, 0)),
  sum,
)(rows);

const Wrapper = ({ className, children, value }) => (
  <div className={className}>
    <Metric
      className={css.metric}
      formatter={METRIC_TYPE_DATA.formatter}
      value={value}
    />
    {children}
  </div>
);

Wrapper.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element,
  value: PropTypes.number.isRequired,
};

Wrapper.defaultProps = {
  className: '',
  children: null,
};

export const RunLabelSum = (props) => {
  const {
    className, runIndex, runCount, rows,
  } = props;

  const rootClassName = cx(css.root, className);
  const currentRunSum = getRunRowsSum(rows, runIndex);

  // Do not display Delta when last run (baseline)
  if (runIndex === runCount - 1) {
    return <Wrapper className={rootClassName} value={currentRunSum} />;
  }

  const baselineRunSum = getRunRowsSum(rows, runIndex + 1);
  const info = getMetricRunInfo(METRIC_TYPE_DATA, currentRunSum, baselineRunSum);

  return (
    <Wrapper className={rootClassName} value={currentRunSum}>
      <Delta
        className={css.delta}
        displayValue={info.displayDeltaPercentage}
        deltaType={info.deltaType}
      />
    </Wrapper>
  );
};

RunLabelSum.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Run index */
  runIndex: PropTypes.number.isRequired,

  /** Run count */
  runCount: PropTypes.number.isRequired,

  /** Rows data */
  rows: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    runs: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.number,
    })),
  })).isRequired,
};

RunLabelSum.defaultProps = {
  className: '',
};
