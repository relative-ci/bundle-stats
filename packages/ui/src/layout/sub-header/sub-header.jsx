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
      </div>
    </Container>
  );
};

SubHeader.defaultProps = {
  className: '',
  subtitle: '',
  icon: null,
  children: null,
};

SubHeader.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.element,
  children: PropTypes.element,
};
