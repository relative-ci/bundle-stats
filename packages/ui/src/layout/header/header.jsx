import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './header.module.css';

export const Header = ({
  className, renderLeft, renderRight, render,
}) => (
  <header className={cx(css.root, className)}>
    {renderLeft({ className: css.left })}
    {render({ className: css.center })}
    {renderRight({ className: css.right })}
  </header>
);

Header.defaultProps = {
  className: '',
  renderLeft: (props) => <div {...props} />,
  render: (props) => <div {...props} />,
  renderRight: (props) => <div {...props} />,
};

Header.propTypes = {
  /* Adopted child class name */
  className: PropTypes.string,

  /* Render left area */
  renderLeft: PropTypes.func,

  /* Render center area */
  render: PropTypes.func,

  /* Render right area */
  renderRight: PropTypes.func,
};
