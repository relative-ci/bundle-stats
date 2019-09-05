import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Dropdown } from '../dropdown';
import css from './sort-dropdown.module.css';

export const SortDropdown = (props) => {
  const {
    className,
    label,
    items,
    sortBy,
    direction,
    onChange,
  } = props;

  const rootClassName = cx(css.root, className);

  const getButtonOnClick = (newSortBy, newDirection) => () => {
    onChange({ sortBy: newSortBy, direction: newDirection });
  };

  const customLabel = items[sortBy]
    ? `Ordered by ${items[sortBy].label}`
    : label;

  return (
    <Dropdown
      className={rootClassName}
      label={customLabel}
      glyph="sort"
      align="right"
    >
      <div className={css.items}>
        {Object.entries(items).map(([key, item]) => (
          <span
            key={key}
            className={cx(css.item, sortBy === key && css.active)}
          >
            <button
              className={css.itemSortBy}
              type="button"
              onClick={getButtonOnClick(key, item.defaultDirection)}
              title={`Order by ${item.label}`}
            >
              {item.label}
            </button>
            <button
              className={css.itemSortType}
              type="button"
              onClick={getButtonOnClick(key, direction === 'asc' ? 'desc' : 'asc')}
              title={`Order data ${direction === 'asc' ? 'descending' : 'ascending'}`}
            >
              <span className="ui-icon ui-icon--small">
                {direction === 'asc' ? 'arrow_downward' : 'arrow_upward' }
              </span>
            </button>
          </span>
        ))}
      </div>
    </Dropdown>
  );
};

SortDropdown.defaultProps = {
  className: '',
  label: 'Sort by',
  onChange: () => {},
  sortBy: '',
  direction: 'asc',
};

SortDropdown.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  items: PropTypes.shape({
    [PropTypes.string]: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func,
  sortBy: PropTypes.string,
  direction: PropTypes.string,
};
