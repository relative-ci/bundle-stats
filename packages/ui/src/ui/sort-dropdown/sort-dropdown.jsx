import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Dropdown } from '../dropdown';
import { Icon } from '../icon';
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
        {Object.entries(items).map(([key, item]) => {
          const sortDirectionProps = direction === 'asc'
            ? {
              className: cx(css.itemSortType, css.itemSortTypeAsc),
              onClick: getButtonOnClick(key, 'desc'),
              title: 'Order data descending',
            } : {
              className: css.itemSortType,
              onClick: getButtonOnClick(key, 'asc'),
              title: 'Order data ascending',
            };

          return (
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
                type="button"
                {...sortDirectionProps}
              >
                <Icon
                  className={css.itemSortTypeIcon}
                  glyph="arrow"
                />
              </button>
            </span>
          );
        })}
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
