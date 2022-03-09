import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './table.module.css';

export const Table = ({ className, emptyMessage, compact, outline, children }) => {
  const rootClassName = cx(css.root, className, compact && css.compact, outline && css.outline);

  if (!children) {
    return <div className={cx(rootClassName, css.empty)}>{emptyMessage}</div>;
  }

  return <table className={rootClassName}>{children}</table>;
};

Table.THead = 'thead';
Table.TBody = 'tbody';
Table.Tr = 'tr';
Table.Th = 'th';
Table.Td = 'td';

Table.defaultProps = {
  className: '',
  emptyMessage: 'No entries found.',
  children: null,
  compact: false,
  outline: false,
};

Table.propTypes = {
  className: PropTypes.string,
  emptyMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  compact: PropTypes.bool,
  outline: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};
