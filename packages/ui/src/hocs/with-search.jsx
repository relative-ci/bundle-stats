import React, { useRef, useState } from 'react';
import { debounce } from 'lodash';

const DEBOUNCE_DURATION = 300;

export const withSearchPattern = () => (BaseComponent) => {
  const WithSearchPattern = (props) => {
    const [search, updateSearch] = useState('');
    const [searchPattern, setSearchPattern] = useState();

    const debouncedUpdateSearchPattern = useRef(
      debounce((newValue) => {
        let newPattern;

        if (!newValue.trim()) {
          return setSearchPattern();
        }

        try {
          newPattern = new RegExp(newValue);
        } catch (error) {
          // skip
        }

        return setSearchPattern(newPattern);
      }, DEBOUNCE_DURATION),
    );

    const handleUpdateSearch = useRef((newValue) => {
      updateSearch(newValue);
      debouncedUpdateSearchPattern.current(newValue);
    });

    return (
      <BaseComponent
        {...props}
        search={search}
        searchPattern={searchPattern}
        updateSearch={handleUpdateSearch.current}
      />
    );
  };

  return WithSearchPattern;
};
