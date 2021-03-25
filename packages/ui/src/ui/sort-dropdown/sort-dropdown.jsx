import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Dropdown } from '../dropdown';
import { Icon } from '../icon';
import css from './sort-dropdown.module.css';

export const SortDropdown = (props) => {
  const { className, label, items, sortBy, direction, onChange } = props;

  const rootClassName = cx(css.root, className);


  const customLabel = items[sortBy] ? `Ordered by ${items[sortBy].label}` : label;

  return (
    <Dropdown className={rootClassName} label={customLabel} glyph="sort" align="right">
      {({ MenuItem, menu, menuItemClassName }) => {
        const getButtonOnClick = (newSortBy, newDirection) => () => {
          onChange({ sortBy: newSortBy, direction: newDirection });
          menu.toggle();
        };

        return (
          <div className={css.items}>
            {Object.entries(items).map(([key, item]) => {
              const buttonProps =
                direction === 'asc'
                  ? {
                    className: cx(css.itemButton, css.itemAsc),
                    onClick: getButtonOnClick(key, 'desc'),
                    title: `Order data by ${item.label} descending`,
                  }
                  : {
                    className: css.itemButton,
                    onClick: getButtonOnClick(key, 'asc'),
                    title: `Order data by ${item.label} ascending`,
                  };

              return (
                <MenuItem
                  key={key}
                  {...menu}
                  {...buttonProps}
                  className={cx(menuItemClassName, css.item, sortBy === key && css.active)}
                >
                  <span className={css.itemLabel}>{item.label}</span>
                  <Icon className={css.itemIcon} glyph="arrow" />
                </MenuItem>
              );
            })}
          </div>
        );
      }}
    </Dropdown>
  );
};

SortDropdown.defaultProps = {
  className: '',
  label: 'Order by',
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
