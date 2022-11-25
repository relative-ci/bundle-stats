import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Dropdown } from '../dropdown';
import { Icon } from '../icon';
import css from './sort-dropdown.module.css';

const Item = ({
  as: Component,
  id,
  label,
  isActive,
  direction,
  defaultDirection,
  getButtonOnClick,
  ...restProps
}) => {

  const buttonProps = useMemo(() => {
    let resolveNextDirection = defaultDirection;

    if (isActive) {
      resolveNextDirection = direction === 'asc' ? 'desc' : 'asc';
    }

    if (resolveNextDirection === 'desc') {
      return {
        className: css.itemAsc,
        onClick: getButtonOnClick(id, 'desc'),
        title: `Order data by ${label} descending`,
      };
    }

    return {
      onClick: getButtonOnClick(id, 'asc'),
      title: `Order data by ${label} ascending`,
    };
  }, [isActive, direction, defaultDirection, id, label]);

  return (
    <Component
      {...restProps}
      {...buttonProps}
      isActive={isActive}
      className={cx(css.item, isActive && css.itemActive, buttonProps.className)}
    >
      <Icon className={css.itemIcon} glyph="arrow" />
      <span className={css.itemLabel}>{label}</span>
    </Component>
  );
};

Item.propTypes = {
  className: PropTypes.string,
  as: PropTypes.element.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  direction: PropTypes.string.isRequired,
  defaultDirection: PropTypes.string.isRequired,
  getButtonOnClick: PropTypes.func.isRequired,
};

Item.defaultProps = {
  className: '',
};

export const SortDropdown = (props) => {
  const { className, label, fields, field, direction, onChange } = props;
  const rootClassName = cx(css.root, className);

  const customLabel = fields[field] ? `Ordered by ${fields[field].label}` : label;

  return (
    <Dropdown className={rootClassName} label={customLabel} glyph="sort" align="right">
      {({ MenuItem, menu, menuItemClassName, menuItemActiveClassName }) => {
        const getButtonOnClick = (newField, newDirection) => () => {
          onChange({ field: newField, direction: newDirection });
          menu.toggle();
        };

        return (
          <div className={css.items}>
            {Object.entries(fields).map(([key, item]) => (
              <Item
                key={key}
                as={MenuItem}
                isActive={field === key}
                id={key}
                label={item.label}
                direction={direction}
                defaultDirection={item.defaultDirection}
                getButtonOnClick={getButtonOnClick}
              />
            ))}
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
