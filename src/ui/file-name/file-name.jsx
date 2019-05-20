import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './file-name.css';

export const FileName = ({ className, name }) => {
  if (!name) {
    return null;
  }

  const parts = name.split('/');
  const { dirname, filename } = parts.length > 1
    ? {
      dirname: parts.slice(0, -1).join('/'),
      filename: parts.slice(-1)[0],
    }
    : {
      dirname: parts.join('/'),
      filename: '',
    };

  return (
    <span className={cx(css.root, className)}>
      {dirname}
      {filename && (
        <span className={css.fileName}>
          {filename}
        </span>
      )}
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
