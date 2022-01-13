import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Dropdown } from '../dropdown';
import { Icon } from '../icon';
import css from './sort-dropdown.module.css';

export const SortDropdown = (props) => {
  const { className, label, fields, field, direction, onChange } = props;
  const rootClassName = cx(css.root, className);

  const customLabel = fields[field] ? `Ordered by ${fields[field].label}` : label;

  return (
    <Dropdown className={rootClassName} label={customLabel} glyph="sort">
      {({ MenuItem, menuItemClassName, menuItemActiveClassName }) => {
        const getButtonOnClick = (newField, newDirection) => () => {
          onChange({ field: newField, direction: newDirection });
        };

        return (
          <div className={css.items}>
            {Object.entries(fields).map(([key, item]) => {
              const buttonProps =
                direction === 'asc'
                  ? {
                      className: css.itemAsc,
                      onClick: getButtonOnClick(key, 'desc'),
                      title: `Order data by ${item.label} descending`,
                    }
                  : {
                      onClick: getButtonOnClick(key, 'asc'),
                      title: `Order data by ${item.label} ascending`,
                    };

              const isActive = field === key;

              return (
                <MenuItem
                  key={key}
                  {...buttonProps}
                  className={cx(
                    buttonProps.className,
                    menuItemClassName,
                    css.item,
                    isActive && menuItemActiveClassName,
                    isActive && css.active,
                  )}
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
  field: '',
  direction: 'asc',
};

SortDropdown.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  fields: PropTypes.shape({
    [PropTypes.string]: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func,
  field: PropTypes.string,
  direction: PropTypes.string,
};
