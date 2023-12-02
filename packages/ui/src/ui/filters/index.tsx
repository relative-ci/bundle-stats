import React, { useCallback, useEffect, useState } from 'react';
import isEqual from 'lodash/isEqual';
import merge from 'lodash/merge';

import { FilterFieldsData } from '../../types';
import { getInitialValues } from './filters.utils';
import { Filters as BaseComponent } from './filters';
export { Filter } from './filters';

interface FiltersProps
  extends Omit<
    React.ComponentProps<typeof BaseComponent>,
    'onChange' | 'filters' | 'values' | 'toggleFilter' | 'toggleFilters'
  > {
  onChange?: (newValues: Record<string, boolean>) => void;
  filters: FilterFieldsData;
}

export const Filters = (props: FiltersProps) => {
  const { onChange, filters, ...restProps } = props;
  const [values, setValues] = useState(getInitialValues('', filters));

  // Update values when the parent filters are changing (route with query string change)
  useEffect(
    () => {
      const parentValues = getInitialValues('', filters);

      if (isEqual(parentValues, values)) {
        return;
      }

      setValues(parentValues);
    },
    // Do not trigger effect when the values are changing locally
    [filters, setValues],
  );

  const toggleFilter = useCallback(
    (key: string, value: boolean) => {
      const nextValues = merge({}, values, { [key]: value });
      setValues(nextValues);

      if (onChange) {
        onChange(nextValues);
      }
    },
    [onChange, setValues, values],
  );

  const toggleFilters = useCallback(
    (newFilters: Record<string, boolean>) => {
      const nextValues = merge({}, values, newFilters);
      setValues(nextValues);

      if (onChange) {
        onChange(nextValues);
      }
    },
    [onChange, setValues, values],
  );

  return (
    <BaseComponent
      {...restProps}
      filters={filters}
      values={values}
      toggleFilter={toggleFilter}
      toggleFilters={toggleFilters}
    />
  );
};
