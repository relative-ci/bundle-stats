import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as BaseHoverCard from '@radix-ui/react-hover-card';

import css from './hover-card.module.css';

const OFFSET = 8;
const DELAY = 300;

const propTypes = {
  className: PropTypes.string,
  label: PropTypes.element.isRequired,
  side: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  children: PropTypes.element.isRequired,
};

const defaultProps = {
  className: '',
  side: 'top',
};

/**
 * @param {PropTypes.InferProps<typeof propTypes>} props
 * @return {React.FunctionComponentElement}
 */
export const HoverCard = (props) => {
  const { className, label, side, children } = props;

  return (
    <BaseHoverCard.Root openDelay={DELAY} closeDelay={DELAY}>
      <BaseHoverCard.Trigger className={cx(css.label, className)}>{label}</BaseHoverCard.Trigger>
      <BaseHoverCard.Content className={css.card} sideOffset={OFFSET} side={side}>
        <BaseHoverCard.Arrow className={css.arrow} offset={OFFSET} />
        {children}
      </BaseHoverCard.Content>
    </BaseHoverCard.Root>
  );
};

HoverCard.propTypes = propTypes;
HoverCard.defaultProps = defaultProps;
