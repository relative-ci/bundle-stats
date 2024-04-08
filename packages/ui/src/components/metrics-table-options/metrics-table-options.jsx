import React from 'react';
import PropTypes from 'prop-types';

import I18N from '../../i18n';
import { Dropdown, DropdownItem } from '../../ui/dropdown';

export const MetricsTableOptions = (props) => {
  const { className, handleViewAll, handleResetFilters, ...restProps } = props;

  return (
    <Dropdown className={className} glyph="more-vertical" {...restProps}>
      {handleResetFilters && (
        <DropdownItem onClick={handleResetFilters}>{I18N.RESET_FILTERS}</DropdownItem>
      )}
      {handleViewAll && <DropdownItem onClick={handleViewAll}>{I18N.VIEW_ALL}</DropdownItem>}
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
