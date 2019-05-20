import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './file-name.css';

const MIN_BREAK_LENGTH = 32;

export const FileName = ({ className, name }) => {
  if (!name) {
    return null;
  }

  const parts = name.split('/');

  return (
    <span className={cx(css.root, className)}>
      {parts.map((part, index) => {
        const key = `${part}-${index}`;
        const isShort = part.length < MIN_BREAK_LENGTH;
        return (
          <span
            key={key}
            className={cx(css.part, isShort && css.noBreak)}
          >
            {part}
          </span>
        );
      })}
    </span>
  );
};

FileName.defaultProps = {
  className: '',
  name: '',
};

FileName.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,

  /** File name source  */
  name: PropTypes.string,
};
