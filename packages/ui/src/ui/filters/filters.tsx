import React, { useCallback, useMemo, useState } from 'react';
import cx from 'classnames';

import type { FilterFieldsData, FilterGroupFieldData } from '../../types';
import { FlexStack } from '../../layout/flex-stack';
import { Stack } from '../../layout/stack';
import { Button } from '../button';
import { ControlGroup } from '../control-group';
import { Dropdown, DropdownGroup, DropdownItem } from '../dropdown';
import { InputSearch } from '../input-search';
import * as I18N from './filters.i18n';
import { getGroupFiltersLabelSuffix, LABELS } from './filters.utils';
import css from './filters.module.css';

interface FilterBooleanProps extends React.ComponentProps<'input'> {
  label: string;
}

const Filter = (props: FilterBooleanProps) => {
  const { className = '', label, name, ...inputProps } = props;

  return (
    <FlexStack
      space="xxxsmall"
      alignItems="center"
      as="label"
      className={cx(css.filter, className)}
    >
      <input
        type="checkbox"
        id={`filter-${name}`}
        name={name}
        {...inputProps}
        className={css.filterControl}
      />
      <span title={label} className={css.filterLabel}>
        {label}
      </span>
    </FlexStack>
  );
};

const getGroupItemKey = (groupKey: string, itemKey: string): string => `${groupKey}.${itemKey}`;

type ToggleFilters = (newFilters: Record<string, boolean>) => void;

type GetOnGroupCheck = (value: boolean, overrides?: Record<string, boolean>) => () => void;

interface FilterDropdownItemProps {
  className?: string;
  id: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
  onChange: FilterBooleanProps['onChange'];
  toggleFilters: ToggleFilters;
  getOnGroupCheck: GetOnGroupCheck;
}

const FilterDropdownItem = (props: FilterDropdownItemProps) => {
  const { className, id, label, checked, disabled, onChange, toggleFilters, getOnGroupCheck } =
    props;

  /**
   * Toggle the filter when the menu item itself is activated: ariakit fires a click on the menu
   * item when pressing Enter/Space, and clicking the item padding targets it directly. Clicks on
   * the nested label/checkbox and on the only button are handled by their own handlers.
   */
  const onItemClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled || event.target !== event.currentTarget) {
        return;
      }

      toggleFilters({ [id]: !checked });
    },
    [disabled, toggleFilters, id, checked],
  );

  /**
   * Check only the current filter of the group
   */
  const onOnlyClick = useCallback(
    () => getOnGroupCheck(false, { [id]: true })(),
    [getOnGroupCheck, id],
  );

  return (
    <DropdownItem
      onClick={onItemClick}
      hideOnClick={false}
      className={cx(css.filterGroupItem, className)}
    >
      <Filter
        label={label}
        name={id}
        onChange={onChange}
        checked={checked}
        disabled={disabled}
        className={css.filterGroupItemFilter}
      />
      <Button
        kind="info"
        solid
        size="small"
        type="button"
        onClick={onOnlyClick}
        disabled={disabled}
        className={css.filterGroupOnlyButton}
      >
        {I18N.ONLY}
      </Button>
    </DropdownItem>
  );
};

interface FilterGroupProps extends React.ComponentProps<'div'> {
  groupKey: string;
  data: FilterGroupFieldData;
  values: Record<string, boolean>;
  onCheckboxChange: FilterBooleanProps['onChange'];
  toggleFilters: ToggleFilters;
}

const FilterGroup = (props: FilterGroupProps) => {
  const { className = '', groupKey, data, values, onCheckboxChange, toggleFilters } = props;
  const { label: groupLabel, children: groupItems } = data;

  const [search, setSearch] = useState('');

  const areAllGroupItemsChecked = groupItems
    .map(({ key: itemKey }) => values?.[`${groupKey}.${itemKey}`])
    .reduce((agg, val) => agg && val, true);

  const filterSuffix = getGroupFiltersLabelSuffix(groupItems);
  const hasCustomFilterSuffix = !Object.values(LABELS).includes(filterSuffix);
  const dropdownLabel = (
    <>
      {`${groupLabel}:`}
      &nbsp;
      <span className={cx(hasCustomFilterSuffix && css.filterGroupLabelSuffixCustom)}>
        {filterSuffix}
      </span>
    </>
  );

  const getOnGroupCheck: GetOnGroupCheck = useCallback(
    (value, overrides = {}) =>
      () => {
        const newFilters = groupItems.reduce(
          (agg, { key: itemKey }) => ({
            ...agg,
            [getGroupItemKey(groupKey, itemKey)]: value,
          }),
          {},
        );

        toggleFilters({
          ...newFilters,
          ...overrides,
        });
      },
    [groupItems, groupKey, toggleFilters],
  );

  const filteredGroupItems = useMemo(() => {
    if (!search) {
      return groupItems;
    }

    return groupItems.filter((item) => item.label.match(new RegExp(`${search}`, 'i')));
  }, [search, groupItems]);

  return (
    <Dropdown
      className={className}
      label={dropdownLabel}
      ariaLabel={`${groupLabel}: ${filterSuffix}`}
    >
      {groupItems.length > 10 && (
        <DropdownGroup>
          <InputSearch
            defaultValue={search}
            onChange={setSearch}
            placeholder={I18N.GROUP_SEARCH}
            debounceWait={0}
          />
        </DropdownGroup>
      )}
      <DropdownGroup className={css.filterGroupItems}>
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
          const id = getGroupItemKey(groupKey, itemKey);

          return (
            <FilterDropdownItem
              key={id}
              id={id}
              label={itemData.label}
              checked={values[id]}
              disabled={itemData.disabled}
              onChange={onCheckboxChange}
              toggleFilters={toggleFilters}
              getOnGroupCheck={getOnGroupCheck}
            />
          );
        })}
      </DropdownGroup>
      {filteredGroupItems.length !== 0 && (
        <DropdownGroup className={css.filterGroupActions}>
          {areAllGroupItemsChecked ? (
            <DropdownItem id="clear-all" onClick={getOnGroupCheck(false)} role="button">
              {I18N.CLEAR}
            </DropdownItem>
          ) : (
            <DropdownItem id="clear-all" onClick={getOnGroupCheck(true)} role="button">
              {I18N.CHECK}
            </DropdownItem>
          )}
        </DropdownGroup>
      )}
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

  /**
   * Toggle filter value on checkbox change
   */
  const onCheckboxChange = useCallback(
    (event: any) => {
      const { name } = event.target;
      toggleFilter(name, !values[name]);
    },
    [toggleFilter, values],
  );

  const filterList = Object.entries(filters);
  const filterCount = filterList.length;

  return (
    <ControlGroup className={cx(css.root, className)}>
      {filterList.map(([name, data], index) => {
        const lastItem = index === filterCount - 1;

        if ('defaultValue' in data) {
          return (
            <Filter
              name={name}
              label={data.label}
              onChange={onCheckboxChange}
              checked={values[name]}
              disabled={data.disabled as boolean}
              key={name}
              className={cx(css.filterSingle, lastItem && css.itemLast)}
            />
          );
        }

        return (
          <FilterGroup
            groupKey={name}
            data={data}
            values={values}
            onCheckboxChange={onCheckboxChange}
            toggleFilters={toggleFilters}
            className={cx(lastItem && css.itemLast)}
            key={name}
          />
        );
      })}
    </ControlGroup>
  );
};
