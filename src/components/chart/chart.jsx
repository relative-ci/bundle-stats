import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import css from './chart.module.css';

export const Chart = ({ className, title, children }) => (
  <div className={cx(css.root, className)}>
    {title && (
      <h3 className={css.title}>
        {title}
      </h3>
    )}
    <div className={css.chart}>
      {children}
    </div>
  </div>
);

Chart.defaultProps = {
  className: '',
  title: '',
  children: null,
};

Chart.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Title */
  title: PropTypes.string,

  /** Children content */
  children: PropTypes.element,
};
