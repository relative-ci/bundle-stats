import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './job-meta.module.css';

export const JobMeta = (props) => {
  const {
    as: Component, className, meta, ...restProps
  } = props;

  const rootClassName = cx(css.root, className);

  return (
    <Component className={rootClassName} {...restProps}>
      {meta.map(({ title, content }, index) => {
        const key = index;

        return (
          <div className={css.item} key={key}>
            {title && (<h2 className={css.itemTitle}>{title}</h2>)}
            {content.map((item) => (
              <>{item}</>
            ))}
          </div>
        );
      })}
    </Component>
  );
};

JobMeta.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** Contrnt */
  meta: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    content: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.element])),
  })).isRequired,

  /** Render component */
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

JobMeta.defaultProps = {
  className: '',
  as: 'div',
};
