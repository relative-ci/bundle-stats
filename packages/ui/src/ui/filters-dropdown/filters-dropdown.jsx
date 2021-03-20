import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { get } from 'lodash';

import { FlexStack } from '../../layout/flex-stack';
import { Dropdown } from '../dropdown';
import { getGroupFiltersLabelSuffix } from './filters-dropdown.utils';
import css from './filters-dropdown.module.css';

const Filter = (props) => {
  const { className, label, name, getOnOnlyClick, ...inputProps } = props;
  const id = `filter-${name}`;

  const rootClassName = cx(css.filter, className);

  return (
    <div className={rootClassName}>
      {/* eslint-disable */}
      <FlexStack space="xxxsmall" as="label" className={css.filterCheckbox}>
      {/* eslint-enabled */}
        <input
          className={css.filterInput}
          type="checkbox"
          id={id}
          name={name}
          {...inputProps}
        />
        <span className={css.filterLabel}>
          {label}
        </span>
      </FlexStack>

      {getOnOnlyClick && (
        <button
          className={css.filterOnlyButton}
          type="button"
          onClick={getOnOnlyClick(name)}
        >
          only
        </button>
      )}
    </div>
  );
};

Filter.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  getOnOnlyClick: PropTypes.func,
};

Filter.defaultProps = {
  className: '',
  getOnOnlyClick: null,
};

const FilterGroup = (props) => {
  const { groupKey, data, values, onCheckboxChange } = props;

  const { label: groupLabel, ...groupData } = data;

  const groupItems = Object.entries(groupData);
  const groupCheckboxes = groupItems.filter(([itemKey, item]) => typeof item?.defaultValue !== 'undefined');
  const isGroupChecked = groupCheckboxes.map(([itemKey]) => get(values, `${groupKey}.${itemKey}`)).reduce((agg, val) => agg && val, true);

  const filterSuffix = getGroupFiltersLabelSuffix(groupItems);

  const onGroupClearAll = () => {
    groupCheckboxes.forEach(([itemKey, item]) => {
      onCheckboxChange({
        target: {
          name: `${groupKey}.${itemKey}`,
          checked: false,
        },
      });
    });
  };

  const onGroupCheckAll = () => {
    groupCheckboxes.forEach(([itemKey, item]) => {
      onCheckboxChange({
        target: {
          name: `${groupKey}.${itemKey}`,
          checked: true,
        },
      });
    });
  };

  return (
    <Dropdown label={`${groupLabel}: ${filterSuffix}`}>
      {groupItems.map(([itemKey, itemData]) => {
        const id = [groupKey, itemKey].join('.');

        const getOnOnlyClick = () => () => {
          onGroupClearAll();
          onCheckboxChange({
            target: {
              name: id,
              checked: true,
            },
          });
        };

        return (
          <Filter
            key={id}
            name={id}
            label={itemData.label}
            onChange={onCheckboxChange}
            checked={values[id]}
            disabled={itemData.disabled}
            getOnOnlyClick={getOnOnlyClick}
          />
        );
      })}

      <div className={css.filterGroupActions}>
        {isGroupChecked ? (
          <button
            className={css.filterGroupButton}
            type="button"
            onClick={onGroupClearAll}
          >
            Clear all
          </button>
        ) : (
          <button
            className={css.filterGroupButton}
            type="button"
            onClick={onGroupCheckAll}
          >
            Check all
          </button>
        )}
      </div>
    </Dropdown>
  );
};

FilterGroup.propTypes = {
  groupKey: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  values: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onCheckboxChange: PropTypes.func.isRequired,
};

export const FiltersDropdown = (props) => {
  const {
    className,
    label,
    values,
    filters,
    toggleFilter,
    hasActiveFilters,
  } = props;

  const onCheckboxChange = ({ target }) => toggleFilter(target.name, target.checked);
  const rootClassName = cx(css.root, className);

  return (
    <form className={rootClassName}>
      <FlexStack space="xsmall" className={css.items}>
        {Object.entries(filters).map(([name, data]) => {
          if (typeof data?.defaultValue !== 'undefined') {
            return (
              <Filter
                key={name}
                className={cx(css.item, css.filterStandalone)}
                name={name}
                label={data.label}
                onChange={onCheckboxChange}
                checked={values[name]}
                disabled={data.disabled}
              />
            );
          }

          return (
            <div className={css.item}>
              <FilterGroup
                key={name}
                groupKey={name}
                data={data}
                values={values}
                onCheckboxChange={onCheckboxChange}
              />
            </div>
          );
        })}
      </FlexStack>
    </form>
  );
};

FiltersDropdown.defaultProps = {
  className: '',
  label: 'Filters',
  active: false,
};

FiltersDropdown.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  hasActiveFilters: PropTypes.bool,
  values: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  filters: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  toggleFilter: PropTypes.func.isRequired,
};
