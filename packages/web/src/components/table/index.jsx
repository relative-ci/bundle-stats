import PropTypes from 'prop-types';
import cx from 'classnames';

import css from './styles.css';

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
  const content = header.text || header;
  const options = header.options || {};

  const style = {
    textAlign: options.align,
    width: options.width,
  };

  return (
    <th class={cx(css.cell, options.classNames)} style={style}>
      {content}
    </th>
  );
};

// eslint-disable-next-line react/prop-types
const Td = ({ cell, options = {} }) => {
  const style = {
    textAlign: options.align,
  };

  return (
    <td class={cx(css.cell, options.classNames)} style={style}>
      {cell}
    </td>
  );
};

const Table = ({ headers, rows }) => (
  <table class={css.root}>
    {headers && (
      <thead>
        <tr>
          {headers.map(header => <Th header={header} />)}
        </tr>
      </thead>
    )}
    <tbody>
      {rows.map(({ options = {}, cells = [], header = '' }) => {
        const rowClassNames = cx(options.classNames);

        return (
          <tr class={rowClassNames}>
            {header &&
              <Th header={header} />
            }
            {cells.map((cell, cellId) => (
              <Td
                cell={cell}
                options={resolveCellOptions(headers, !!header, cellId)}
              />
            ))}
          </tr>
        );
      })}
    </tbody>
  </table>
);

Table.defaultProps = {
  headers: [],
  rows: [],
};

Table.propTypes = {
  headers: PropTypes.array, // eslint-disable-line react/forbid-prop-types
  rows: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

export default Table;
