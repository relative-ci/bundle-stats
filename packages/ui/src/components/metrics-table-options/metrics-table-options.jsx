import React from 'react';
import PropTypes from 'prop-types';

import I18N from '../../i18n';
import { Dropdown } from '../../ui/dropdown';

export const MetricsTableOptions = (props) => {
  const { className,  handleViewAll, handleResetFilters, ...restProps } = props;

  return (
    <Dropdown className={className} glyph="menu" {...restProps}>
      {({ MenuItem, menu, menuItemClassName }) => {
        const getButtonOnClick = (handler) => () => {
          handler();
          menu.toggle();
        };

        return (
          <>
            {handleResetFilters && (
              <MenuItem
                {...menu}
                className={menuItemClassName}
                onClick={getButtonOnClick(handleResetFilters)}
              >
                {I18N.RESET_FILTERS}
              </MenuItem>
            )}
            {handleViewAll && (
              <MenuItem
                {...menu}
                className={menuItemClassName}
                onClick={getButtonOnClick(handleViewAll)}
              >
                {I18N.VIEW_ALL}
              </MenuItem>
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
