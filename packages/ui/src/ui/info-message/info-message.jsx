import React from 'react';
import cx from 'classnames';

import css from './info-message.module.css';

export const InfoMessage = (props) => {
  const { className, kind, children } = props;

  return (
    <div className={cx(css.root, className, css[kind])}>
      {children}
    </div>
  );
};
