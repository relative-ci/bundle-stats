import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Container } from '../../ui/container';
import css from './sub-header.module.css';

export const SubHeader = (props) => {
  const {
    className,
    subtitle,
    title,
    icon,
    children,
    rightSide,
  } = props;

  return (
    <Container className={cx(css.root, className)}>
      <div className={css.inner}>
        {icon && (
          <div className={css.icon}>
            {icon}
          </div>
        )}
        <div className={css.details}>
          {subtitle && (
            <p className={css.subtitle}>
              {subtitle}
            </p>
          )}
          <h1 className={css.title}>
            {title}
          </h1>
          {children}
        </div>
        {rightSide && (
          <div className={css.rightSide}>
            {rightSide}
          </div>
        )}
      </div>
    </Container>
  );
};

SubHeader.defaultProps = {
  className: '',
  subtitle: '',
  icon: null,
  children: null,
  rightSide: null,
};

SubHeader.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.element,
  children: PropTypes.element,
  rightSide: PropTypes.element,
};
