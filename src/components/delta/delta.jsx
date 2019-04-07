import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './delta.module.css';

export const Delta = ({
  className, value, displayValue, biggerIsBetter,
}) => {
  const positiveChange = (biggerIsBetter && value > 0) || (!biggerIsBetter && value < 0);

  const valueClassNames = cx(css.value, {
    [css.positive]: value !== 0 && positiveChange,
    [css.negative]: value !== 0 && !positiveChange,
  });

  const rootClassName = cx(css.root, className);

  return (
    <span className={rootClassName}>
      <code className={valueClassNames}>
        {displayValue}
      </code>
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
