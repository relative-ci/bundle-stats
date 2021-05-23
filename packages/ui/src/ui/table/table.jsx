import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './table.module.css';

const THead = (props) => <thead {...props} />

const TBody = (props) => <tbody {...props} />;

const Tr = (props) => {
  const { className, ...restProps } = props;
  return <tr className={cx(css.row, className)} {...restProps} />;
};

Tr.defaultProps = {
  className: '',
};

Tr.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,
};

const Th = (props) => {
  const { className, ...restProps } = props;

  return <th className={cx(css.cell, className)} {...restProps} />;
};

Th.defaultProps = {
  className: '',
};

Th.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,
};

const Td = (props) => {
  const { className, ...restProps } = props;
  return <td className={cx(css.cell, className)} {...restProps} />;
};

Td.defaultProps = {
  className: '',
};

Td.propTypes = {
  /** Adopted child class name */
  className: PropTypes.string,
};

export const Table = ({ className, emptyMessage, children }) => {
  const rootClassName = cx(css.root, className);

  if (!children) {
    return <div className={cx(rootClassName, css.empty)}>{emptyMessage}</div>;
  }

  return <table className={rootClassName}>{children}</table>;
};

Table.THead = THead;
Table.TBody = TBody;
Table.Th = Th;
Table.Tr = Tr;
Table.Td = Td;

Table.defaultProps = {
  className: '',
  emptyMessage: 'No entries found.',
  children: null,
};

Table.propTypes = {
  className: PropTypes.string,
  emptyMessage: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
};
