import React, { useCallback, useEffect, useState } from 'react';
import cx from 'classnames';
import debounce from 'lodash/debounce';
import noop from 'lodash/noop';

import { Button } from '../button';
import { Icon } from '../icon';
import { Input } from '../input';

import css from './input-search.module.css';

interface InputSearchProps {
  placeholder?: string;
  defaultValue?: string;
  onChange?: (newValue: string) => void;
  debounceWait?: number;
}

export const InputSearch = (
  props: InputSearchProps & Omit<React.ComponentProps<'div'>, 'onChange'>,
) => {
  const {
    className = '',
    placeholder = 'Search',
    defaultValue = '',
    onChange = noop,
    debounceWait = 500,
  } = props;
  const rootClassname = cx(css.root, className);

  const [value, setValue] = useState(defaultValue);

  // Update local state when default value changes
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const debouncedUpdateSearch = useCallback(debounce(onChange, debounceWait), [onChange]);

  const changeValue = useCallback(
    (newValue: string) => {
      if (newValue !== value) {
        debouncedUpdateSearch(newValue);
        setValue(newValue);
      }
    },
    [setValue, value],
  );

  const inputOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      changeValue(event.target.value);
    },
    [changeValue],
  );

  const clearButtonOnClick = useCallback(() => {
    changeValue('');
  }, [changeValue]);

  return (
    <div className={rootClassname}>
      <Input
        className={css.input}
        placeholder={placeholder}
        onChange={inputOnChange}
        value={value}
        size="small"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
      />
      {value && (
        <Button
          size="small"
          radius="circle"
          glyph={Icon.ICONS.CANCEL}
          type="button"
          onClick={clearButtonOnClick}
          aria-label="Clear search"
          className={css.cancelButton}
        />
      )}
    </div>
  );
};
