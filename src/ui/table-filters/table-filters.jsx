import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { IconText } from '../icon-text';
import css from './table-filters.css';

const Checkbox = ({ label, name, ...inputProps }) => {
  const id = `filter-${name}`;

  return (
    <div className={css.filter}>
      <input
        className={css.filterInput}
        type="checkbox"
        id={id}
        name={name}
        {...inputProps}
      />
      {/* eslint-disable jsx-a11y/label-has-for */}
      <label
        htmlFor={id}
        className={css.filterLabel}
      >
        {label}
      </label>
      {/* eslint-enabled jsx-a11y/label-has-for */}
    </div>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const renderTree = (key, data, values, onCheckboxChange) => {
  if (typeof data.defaultValue !== 'undefined') {
    return (
      <Checkbox
        key={key}
        name={key}
        label={data.label}
        onChange={onCheckboxChange}
        checked={values[key]}
      />
    );
  }

  if (typeof data === 'object') {
    return (
      <div className={css.group} key={key}>
        <div className={css.groupHeader}>
          {data.label && (
            <h3 className={css.groupTitle}>
              {data.label}
            </h3>
          )}
        </div>

        {Object.entries(data).map(([itemKey, itemData]) => renderTree(
          [...(key ? [key] : []), itemKey].join('.'),
          itemData,
          values,
          onCheckboxChange,
        ))}
      </div>
    );
  }

  return null;
};

export const TableFilters = (props) => {
  const {
    className,
    label,
    values,
    filters,
    toggleFilter,
  } = props;

  const onCheckboxChange = ({ target }) => toggleFilter(target.name, target.checked);
  const rootClassName = cx(css.root, className);

  return (
    <div className={rootClassName}>
      <IconText glyph="filter" className={css.label}>
        {label}
      </IconText>

      <form className={css.dropdown}>
        {renderTree('', filters, values, onCheckboxChange)}
      </form>
    </div>
  );
};

TableFilters.defaultProps = {
  className: '',
  label: 'Filters',
};

TableFilters.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  values: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  filters: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  toggleFilter: PropTypes.func.isRequired,
};
