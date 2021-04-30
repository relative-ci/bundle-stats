import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { debounce } from 'lodash';

import { Icon } from '../../ui/icon';

import css from './metrics-table-search.module.css';

export const MetricsTableSearch = (props) => {
  const { className, placeholder, search, updateSearch } = props;
  const rootClassname = cx(css.root, className);

  const [value, setValue] = useState(search);

  // Update local state when initial value has changed
  useEffect(() => {
    setValue(search);
  }, [search]);

  const debouncedUpdateSearch = useCallback(debounce(updateSearch, 500), []);

  const handleChangeValue = useCallback(
    (event) => {
      const newValue = event.target.value;
      setValue(newValue);

      // Update parent state when the local value has changed
      if (newValue !== search) {
        debouncedUpdateSearch(newValue);
      }
    },
    [search],
  );

  const handleClearValue = useCallback(() => {
    const newValue = '';
    setValue(newValue);
    updateSearch(newValue);
  }, []);

  return (
    <div className={rootClassname}>
      <input
        className={cx('ui-input', 'ui-input--small', css.input)}
        placeholder={placeholder}
        onChange={handleChangeValue}
        value={value}
      />
      {search && (
        <button className={css.cancelButton} type="button" onClick={handleClearValue}>
          <Icon className={css.cancelButtonIcon} glyph="cancel" />
        </button>
      )}
    </div>
  );
};

MetricsTableSearch.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  search: PropTypes.string.isRequired,
  updateSearch: PropTypes.func.isRequired,
};

MetricsTableSearch.defaultProps = {
  className: '',
  placeholder: '',
};
