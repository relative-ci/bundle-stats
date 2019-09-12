import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './delta.module.css';

const LEVEL_CHANGE = 5;

export const Delta = ({
  className, value, displayValue, biggerIsBetter,
}) => {
  const positiveChange = (biggerIsBetter && value > 0) || (!biggerIsBetter && value < 0);

  const absValue = Math.abs(value);

  const rootClassName = cx(css.root, className, {
    [css.negative]: !positiveChange && (absValue >= LEVEL_CHANGE),
    [css.slightlyNegative]: !positiveChange && (absValue > 0 && absValue < LEVEL_CHANGE),
    [css.slightlyPositive]: positiveChange && (absValue > 0 && absValue < LEVEL_CHANGE),
    [css.positive]: positiveChange && (absValue >= LEVEL_CHANGE),
  });

  return (
    <span className={rootClassName}>
      {displayValue}
    </span>
  );
};

Delta.defaultProps = {
  className: '',
  biggerIsBetter: true,
};

Delta.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number.isRequired,
  displayValue: PropTypes.string.isRequired,
  biggerIsBetter: PropTypes.bool,
};
