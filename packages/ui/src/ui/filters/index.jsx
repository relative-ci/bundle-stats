import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isEqual, merge } from 'lodash';

import { getInitialValues } from './filters.utils';
import { Filters as BaseComponent } from './filters';

export const Filters = (props) => {
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
    (key, value) => {
      const nextValues = merge({}, values, { [key]: value });
      setValues(nextValues);

      if (onChange) {
        onChange(nextValues);
      }
    },
    [onChange, setValues, values]
  );

  const toggleFilters = useCallback(
    (newFilters) => {
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

Filters.defaultProps = {
  onChange: null,
};

Filters.propTypes = {
  /** Filter config */
  filters: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types

  /** OnChange handler */
  onChange: PropTypes.func,
};
