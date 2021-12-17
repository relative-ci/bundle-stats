import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './icon.module.css';

const ICONS = {
  ALERT_CIRCLE: 'alert-circle',
  ARROW: 'arrow',
  ARROW_RIGHT_CIRLCE: 'arrow-right-circle',
  CANCEL: 'cancel',
  CLOSE: 'close',
  CLOCK: 'clock',
  CHECK_CIRCLE: 'check-circle',
  COMMIT: 'commit',
  FILTER: 'filter',
  HELP: 'help',
  MENU: 'menu',
  SORT: 'sort',
  WARNING: 'warning',
};

export const Icon = ({ className, glyph, as: Component, size, ...restProps }) => (
  <Component className={cx(css.root, className, css[size])} {...restProps}>
    <svg className={css.icon}>
      <use xlinkHref={`#${glyph}`} />
    </svg>
  </Component>
);

Icon.ICONS = ICONS;

Icon.SIZE_SMALL = 'small';
Icon.SIZE_MEDIUM = 'medium';
Icon.SIZE_LARGE = 'large';
Icon.SIZES = [Icon.SIZE_SMALL, Icon.SIZE_MEDIUM, Icon.SIZE_LARGE];

Icon.defaultProps = {
  className: '',
  as: 'span',
  size: Icon.SIZE_MEDIUM,
};

Icon.propTypes = {
  className: PropTypes.string,
  glyph: PropTypes.oneOfType([PropTypes.oneOf(Object.values(ICONS)), PropTypes.node]).isRequired,
  as: PropTypes.node,
  size: PropTypes.oneOf(Icon.SIZES),
};
