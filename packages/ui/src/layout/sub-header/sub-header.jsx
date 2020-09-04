import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Container } from '../../ui/container';
import { Box } from '../box';
import css from './sub-header.module.css';

const SIZE_SMALL = 'small';
const SIZE_DEFAULT = 'default';
const SIZES = [SIZE_SMALL, SIZE_DEFAULT];

export const SubHeader = (props) => {
  const { className, size, subtitle, title, icon, children, rightSide } = props;

  const rootClassName = cx(css.root, css[size], className);

  return (
    <Box padding="small" className={rootClassName}>
      <Container>
        <div className={css.inner}>
          {icon && <div className={css.icon}>{icon}</div>}
          <div className={css.details}>
            {subtitle && <p className={css.subtitle}>{subtitle}</p>}
            <h1 className={css.title}>{title}</h1>
            {children}
          </div>
          {rightSide && <div className={css.rightSide}>{rightSide}</div>}
        </div>
      </Container>
    </Box>
  );
};

SubHeader.defaultProps = {
  className: '',
  size: SIZE_DEFAULT,
  subtitle: '',
  icon: null,
  children: null,
  rightSide: null,
};

SubHeader.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(SIZES),
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  icon: PropTypes.element,
  children: PropTypes.element,
  rightSide: PropTypes.element,
};
