import React from 'react';
import cx from 'classnames';

import css from './icon.module.css';

const ICONS = {
  ARROW: 'arrow',
  ARROW_RIGHT_CIRLCE: 'arrow-right-circle',
  CANCEL: 'close',
  CLOSE: 'close',
  CLOCK: 'clock',
  COMMIT: 'commit',
  ERROR: 'error',
  EXTERNAL_LINK: 'external-link',
  FILTER: 'filter',
  GITHUB: 'github',
  INFO: 'info',
  HELP: 'help',
  MENU: 'menu',
  MORE_VERTICAL: 'more-vertical',
  SORT: 'sort',
  WARNING: 'warning',
} as const;

const SIZE = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
} as const;

export type IconGlyph = (typeof ICONS)[keyof typeof ICONS];

interface IconProps {
  glyph: IconGlyph;
  size?: (typeof SIZE)[keyof typeof SIZE];
  as?: React.ElementType;
}

export const Icon = (props: IconProps & React.ComponentProps<'span'>) => {
  const { className = '', glyph, as: Component = 'span', size = SIZE.MEDIUM, ...restProps } = props;

  return (
    <Component className={cx(css.root, className, css[size])} {...restProps}>
      <svg className={css.icon}>
        <use xlinkHref={`#${glyph}`} />
      </svg>
    </Component>
  );
};

Icon.ICONS = ICONS;

Icon.SIZE_SMALL = SIZE.SMALL;
Icon.SIZE_MEDIUM = SIZE.MEDIUM;
Icon.SIZE_LARGE = SIZE.LARGE;
Icon.SIZES = Object.values(SIZE);
