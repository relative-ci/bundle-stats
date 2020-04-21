import React, { useLayoutEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { usePopper } from 'react-popper';
import { useHover } from 'use-events';

import css from './tooltip.module.css';

export const Tooltip = (props) => {
  const {
    className,
    title,
    children,
    as: Component,
    align,
    containerRef: ref,
    ...restProps
  } = props;

  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    strategy: 'fixed',
    modifiers: [{ name: 'arrow', options: { element: arrowElement, padding: 5 } }],
  });
  const [active, bind] = useHover();

  // Portal container
  const portalElmRef = useRef();

  useLayoutEffect(() => {
    if (portalElmRef.current) {
      return;
    }

    let portalElm = document.getElementById('tooltip');

    if (portalElm) {
      portalElmRef.current = portalElm;
      return;
    }

    portalElm = document.createElement('div');
    portalElm.id = 'tooltip';
    portalElm.style.zIndex = '10000';
    portalElm.style.position = 'relative';

    document.body.appendChild(portalElm);
    portalElmRef.current = portalElm;
  }, []);

  const rootClassName = cx(css.root, className, align && css[align]);
  const showTooltip = title && portalElmRef.current && active;

  return (
    <Component className={rootClassName} {...(ref ? { ref } : {})} {...restProps}>
      <span ref={setReferenceElement} {...bind}>
        {children}
      </span>

      {showTooltip &&
        ReactDOM.createPortal(
          <div
            className={css.tooltip}
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            {title}
            <div ref={setArrowElement} style={styles.arrow} {...attributes.arrow} />
          </div>,
          portalElmRef.current,
        )}
    </Component>
  );
};

Tooltip.defaultProps = {
  className: '',
  title: '',
  as: 'span',
  align: '',
  containerRef: null,
};

Tooltip.propTypes = {
  className: PropTypes.string,
  title: PropTypes.node,
  children: PropTypes.node.isRequired,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.element, PropTypes.func]),
  align: PropTypes.oneOf(['', 'topLeft']),
  containerRef: PropTypes.shape({
    current: PropTypes.object,
  }),
};
