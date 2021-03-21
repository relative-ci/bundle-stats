import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Dropdown } from '../../ui/dropdown';
import css from './metrics-table-options.module.css';

export const MetricsTableOptions = (props) => {
  const { className,  handleViewAll, handleResetFilters, ...restProps } = props;
  const rootClassName = cx(css.root, className);

  return (
    <Dropdown className={rootClassName} glyph="menu" align="right" {...restProps}>
      {({ dropdownToggle }) => {
        const getButtonOnClick = (handler) => () => {
          handler();
          dropdownToggle();
        };

        return (
          <>
            {handleResetFilters && (
              <button
                type="button"
                className={css.item}
                onClick={getButtonOnClick(handleResetFilters)}
              >
                Reset filters
              </button>
            )}
            {handleViewAll && (
              <button type="button" className={css.item} onClick={getButtonOnClick(handleViewAll)}>
                View all entries
              </button>
            )}
          </>
        );
      }}
    </Dropdown>
  );
};

MetricsTableOptions.propTypes = {
  className: PropTypes.string,
  handleViewAll: PropTypes.func,
  handleResetFilters: PropTypes.func,
};

MetricsTableOptions.defaultProps = {
  className: '',
  handleViewAll: null,
  handleResetFilters: null,
};
