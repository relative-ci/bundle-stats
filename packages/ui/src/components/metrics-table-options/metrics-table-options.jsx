import React from 'react';
import PropTypes from 'prop-types';

import I18N from '../../i18n';
import { Dropdown } from '../../ui/dropdown';

export const MetricsTableOptions = (props) => {
  const { className,  handleViewAll, handleResetFilters, ...restProps } = props;

  return (
    <Dropdown className={className} glyph="menu" {...restProps}>
      {handleResetFilters && (
        <Dropdown.Item onClick={handleResetFilters}>
          {I18N.RESET_FILTERS}
        </Dropdown.Item>
      )}
      {handleViewAll && (
        <Dropdown.Item onClick={handleViewAll}>
          {I18N.VIEW_ALL}
        </Dropdown.Item>
      )}
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
