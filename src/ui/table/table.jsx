import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './table.module.css';

const resolveCellOptions = (headers, hasRowHeader, cellId) => {
  if (!headers) {
    return {};
  }

  const headerId = hasRowHeader ? cellId + 1 : cellId;
  const header = headers[headerId];

  return (header && header.options) || {};
};

// eslint-disable-next-line react/prop-types
const Th = ({ header }) => {
  const content = typeof header === 'object' ? header.text : header;
  const options = header.options || {};

  const style = {
    textAlign: options.align,
    width: options.width,
  };

  return (
    <th className={cx(css.cell, options.classNames)} style={style}>
      {content}
    </th>
  );
};

// eslint-disable-next-line react/prop-types
const Td = ({ cell, options = {}, ...props }) => {
  const style = {
    textAlign: options.align,
  };

  return (
    <td className={cx(css.cell, options.classNames)} style={style} {...props}>
      {cell}
    </td>
  );
};

export const Table = ({ className, headers, rows }) => (
  <table className={cx(className, css.root)}>
    {(headers && headers.length > 0) && (
      <thead>
        <tr>
          {headers.map((header, index) => {
            const key = index;
            return <Th key={key} header={header} />;
          })}
        </tr>
      </thead>
    )}
    <tbody>
      {rows.length > 0 && rows.map(({
        options = {},
        cells = [],
        header = '',
        key,
      }, index) => {
        const rowClassNames = cx(options.classNames);

        return (
          <tr className={rowClassNames} key={key || index}>
            {header ? <Th header={header} /> : null }
            {cells.map((cell, cellId) => {
              const cellKey = cellId;

              return (
                <Td
                  key={cellKey}
                  cell={cell}
                  options={resolveCellOptions(headers, !!header, cellId)}
                />
              );
            })}
          </tr>
        );
      })}

      {rows.length === 0 && (
        <tr>
          <Td
            colSpan={headers.length || 1}
            cell="No entries found."
            options={{
              classNames: css.emptyCell,
            }}
          />
        </tr>
      )}
    </tbody>
  </table>
);

Table.defaultProps = {
  className: '',
  headers: [],
  rows: [],
};

Table.propTypes = {
  className: PropTypes.string,
  headers: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  rows: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};
