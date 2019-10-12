import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import GithubSvg from './assets/github.inline.svg';
import LogoSvg from './assets/logo.inline.svg';
import LogotypeSvg from './assets/logotype.inline.svg';
import WebpackSvg from './assets/webpack.inline.svg';
import {
  KIND_DEFAULT, KIND_LOGO, KIND_LOGOTYPE, KIND_GITHUB, KIND_WEBPACK, KINDS,
} from './logo.constants';
import css from './logo.module.css';

const ICONS = {
  [KIND_GITHUB]: GithubSvg,
  [KIND_LOGOTYPE]: LogotypeSvg,
  [KIND_LOGO]: LogoSvg,
  [KIND_WEBPACK]: WebpackSvg,
};

export const Logo = ({
  className,
  as: Component,
  kind,
  ...props
}) => {
  const rootClassName = cx(css.root, css[kind], className);
  const Svg = ICONS[kind] || LogoSvg;

  return (
    <Component
      className={rootClassName}
      {...props}
    >
      <Svg className={css.svg} />
    </Component>
  );
};

Logo.defaultProps = {
  as: 'span',
  className: '',
  kind: KIND_DEFAULT,
};

Logo.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Rendered component */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.elementType]),

  /** Kind modifier */
  kind: PropTypes.oneOf(KINDS),
};
