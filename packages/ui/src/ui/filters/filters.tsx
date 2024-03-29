import React, { useCallback, useMemo, useState } from 'react';
import cx from 'classnames';

import type { FilterFieldsData, FilterGroupFieldData } from '../../types';
import { FlexStack } from '../../layout/flex-stack';
import { Stack } from '../../layout/stack';
import { Button } from '../button';
import { Dropdown } from '../dropdown';
import { InputSearch } from '../input-search';
import * as I18N from './filters.i18n';
import { getGroupFiltersLabelSuffix, LABELS } from './filters.utils';
import css from './filters.module.css';

interface FilterProps extends React.ComponentProps<'input'> {
  as?: React.ElementType;
  buttonClassName?: string;
  label: string;
  name: string;
  getOnOnlyClick?: (name: string) => () => void;
}

const Filter = (props: FilterProps) => {
  const {
    className = '',
    as: Component = 'div',
    buttonClassName = '',
    label,
    name,
    getOnOnlyClick,
    ...inputProps
  } = props;

  const id = `filter-${name}`;
  const rootClassName = cx(css.filter, className);

  return (
    <Component className={rootClassName}>
      {/* eslint-disable */}
      <FlexStack
        space="xxxsmall"
        alignItems="center"
        as="label"
        className={cx(css.filterCheckbox, buttonClassName)}
      >
        {/* eslint-enabled */}
        <input type="checkbox" id={id} name={name} {...inputProps} className={css.filterInput} />
        <span title={label} className={css.filterLabel}>
          {label}
        </span>
      </FlexStack>

      {getOnOnlyClick && (
        <Button
          kind="info"
          solid
          size="small"
          type="button"
          onClick={getOnOnlyClick(name)}
          className={css.filterOnlyButton}
        >
          {I18N.ONLY}
        </Button>
      )}
    </Component>
  );
};

interface FilterGroupProps extends React.ComponentProps<'div'> {
  buttonClassName?: string;
  groupKey: string;
  data: FilterGroupFieldData;
  values: Record<string, boolean>;
  onCheckboxChange: FilterProps['onChange'];
  toggleFilters: (newFilters: Record<string, boolean>) => void;
}

const FilterGroup = (props: FilterGroupProps) => {
  const {
    className = '',
    buttonClassName = '',
    groupKey,
    data,
    values,
    onCheckboxChange,
    toggleFilters,
  } = props;

  const [search, setSearch] = useState('');

  const { label: groupLabel, children: groupItems } = data;

  const areAllGroupItemsChecked = groupItems
    .map(({ key: itemKey }) => values?.[`${groupKey}.${itemKey}`])
    .reduce((agg, val) => agg && val, true);

  const filterSuffix = getGroupFiltersLabelSuffix(groupItems);
  const hasCustomFilterSuffix = !Object.values(LABELS).includes(filterSuffix);
  const dropdownLabel = (
    <>
      {`${groupLabel}:`}
      &nbsp;
      <span className={cx(hasCustomFilterSuffix && css.labelSuffixCustom)}>{filterSuffix}</span>
    </>
  );

  const getOnGroupCheck =
    (value: boolean, overrides = {}) =>
    () => {
      const newFilters = groupItems.reduce(
        (agg, { key: itemKey }) => ({
          ...agg,
          [`${groupKey}.${itemKey}`]: value,
        }),
        {},
      );

      toggleFilters({
        ...newFilters,
        ...overrides,
      });
    };

  const filteredGroupItems = useMemo(() => {
    if (!search) {
      return groupItems;
    }

    return groupItems.filter((item) => item.label.match(new RegExp(`${search}`, 'i')));
  }, [search, groupItems]);

  return (
    <Dropdown
      className={className}
      buttonClassName={buttonClassName}
      label={dropdownLabel}
      ariaLabel={`${groupLabel}: ${filterSuffix}`}
    >
      {({ MenuItem, menuItemClassName }) => {
        return (
          <>
            {groupItems.length > 10 && (
              <div className={css.filterGroupSearchWrapper}>
                <InputSearch
                  defaultValue={search}
                  onChange={setSearch}
                  placeholder={I18N.GROUP_SEARCH}
                  debounceWait={0}
                />
              </div>
            )}
            <div className={css.filterGroupItems}>
              {filteredGroupItems.length === 0 && (
                <Stack className={css.filterGroupSearchNotFound}>
                  <p>{I18N.GROUP_NOT_FOUND}</p>
                  <div>
                    <Button
                      size="small"
                      kind="primary"
                      type="button"
                      onClick={() => setSearch('')}
                      className={css.filterGroupSearchNotFoundClear}
                    >
                      {I18N.GROUP_SEARCH_CLEAR}
                    </Button>
                  </div>
                </Stack>
              )}
              {filteredGroupItems.map(({ key: itemKey, ...itemData }) => {
                const id = [groupKey, itemKey].join('.');
                const getOnOnlyClick = () => getOnGroupCheck(false, { [id]: true });

                return (
                  <Filter
                    key={id}
                    className={menuItemClassName}
                    as={MenuItem}
                    name={id}
                    label={itemData.label}
                    onChange={onCheckboxChange}
                    checked={values[id]}
                    disabled={itemData.disabled}
                    getOnOnlyClick={getOnOnlyClick}
                  />
                );
              })}
            </div>
            {filteredGroupItems.length !== 0 && (
              <div className={css.filterGroupActions}>
                {areAllGroupItemsChecked ? (
                  <MenuItem
                    id="clear-all"
                    as="button"
                    className={menuItemClassName}
                    type="button"
                    onClick={getOnGroupCheck(false)}
                  >
                    {I18N.CLEAR}
                  </MenuItem>
                ) : (
                  <MenuItem
                    id="clear-all"
                    as="button"
                    className={menuItemClassName}
                    type="button"
                    onClick={getOnGroupCheck(true)}
                  >
                    {I18N.CHECK}
                  </MenuItem>
                )}
              </div>
            )}
          </>
        );
      }}
    </Dropdown>
  );
};

interface FiltersProps extends React.ComponentProps<'div'> {
  values: Record<string, boolean>;
  filters: FilterFieldsData;
  toggleFilter: (name: string, value: boolean) => void;
  toggleFilters: FilterGroupProps['toggleFilters'];
}

export const Filters = (props: FiltersProps) => {
  const { className = '', values, filters, toggleFilter, toggleFilters } = props;

  const onCheckboxChange = useCallback(
    (event: any) => {
      const { name } = event.target;
      toggleFilter(name, !values[name]);
    },
    [toggleFilter, values],
  );
  const rootClassName = cx(css.root, className);

  return (
    <form className={rootClassName}>
      <FlexStack space="xxsmall" alignItems="top" className={css.items}>
        {Object.entries(filters).map(([name, data]) => {
          if ('defaultValue' in data) {
            return (
              <Filter
                key={name}
                className={cx(css.item, css.filterStandalone)}
                buttonClassName={css.itemButton}
                name={name}
                label={data.label}
                onChange={onCheckboxChange}
                checked={values[name]}
                disabled={data.disabled as boolean}
              />
            );
          }

          return (
            <FilterGroup
              className={css.item}
              buttonClassName={css.itemButton}
              key={name}
              groupKey={name}
              data={data}
              values={values}
              onCheckboxChange={onCheckboxChange}
              toggleFilters={toggleFilters}
            />
          );
        })}
      </FlexStack>
    </form>
  );
};
