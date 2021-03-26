import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { get } from 'lodash';

import { FlexStack } from '../../layout/flex-stack';
import { Dropdown } from '../dropdown';
import { getGroupFiltersLabelSuffix, LABELS } from './filters.utils';
import css from './filters.module.css';

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
        <span className={css.filterLabel} title={label}>
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
  const hasCustomFilterSuffix = !Object.values(LABELS).includes(filterSuffix);
  const dropdownLabel = (
    <>
      {`${groupLabel}:`}
      &nbsp;
      <span className={cx(hasCustomFilterSuffix && css.labelSuffixCustom)}>
        {filterSuffix}
      </span>
    </>
  );

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
    <Dropdown label={dropdownLabel} ariaLabel={`${groupLabel}: ${filterSuffix}`}>
      {({ MenuItem, menu, menuItemClassName }) => (
        <>
          <div className={css.filterGroupItems}>
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

              const handleOnChange = (data) => {
                onCheckboxChange(data);
                menu.hide();
              };

              return (
                <MenuItem key={id} {...menu} className={cx(menuItemClassName, css.filterGroupItem)}>
                  <Filter
                    name={id}
                    label={itemData.label}
                    onChange={handleOnChange}
                    checked={values[id]}
                    disabled={itemData.disabled}
                    getOnOnlyClick={getOnOnlyClick}
                  />
                </MenuItem>
              );
            })}
          </div>
          <div className={css.filterGroupActions}>
            {isGroupChecked ? (
              <MenuItem
                id="clear-all"
                as="button"
                className={menuItemClassName}
                type="button"
                onClick={onGroupClearAll}
              >
                Clear all
              </MenuItem>
            ) : (
              <MenuItem
                id="clear-all"
                as="button"
                className={menuItemClassName}
                type="button"
                onClick={onGroupCheckAll}
              >
                Check all
              </MenuItem>
            )}
          </div>
        </>
      )}

    </Dropdown>
  );
};

FilterGroup.propTypes = {
  groupKey: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  values: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  onCheckboxChange: PropTypes.func.isRequired,
};

export const Filters = (props) => {
  const {
    className,
    values,
    filters,
    toggleFilter,
  } = props;

  const onCheckboxChange = ({ target }) => toggleFilter(target.name, target.checked);
  const rootClassName = cx(css.root, className);

  return (
    <form className={rootClassName}>
      <FlexStack className={css.items}>
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

Filters.defaultProps = {
  className: '',
};

Filters.propTypes = {
  className: PropTypes.string,
  values: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  filters: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  toggleFilter: PropTypes.func.isRequired,
};
